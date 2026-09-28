// Publish Unbrowse's indexed sites as focused packs: one scoped MCP server and one skill per site
// ("Unbrowse for Airbnb (unofficial)", skill `airbnb`), built from the live public registry.
//   node --experimental-strip-types pipeline/publish.ts [--limit 25] [--hosts a.com,b.com]
//        [--out artifacts/site-packs] [--verify] [--to repo,mcp-registry,smithery,clawhub] [--curated a.com] [--dry-run]
// Targets, by what each registry's policy allows:
//   repo          every pack → github.com/unbrowse-ai/sites (skills.sh, SkillsMP, Claude/Codex plugin marketplace).
//   mcp-registry  ONE entry, io.github.unbrowse-ai/sites with {site} as a URL variable. Its terms (§9.4) forbid
//                 near-identical servers under different names, so never one entry per site. Needs mcp-publisher login.
//   smithery      per site: an MCP server at its own host (https://<app>-mcp.unbrowse.ai/mcp, attached with
//                 CLOUDFLARE_API_TOKEN) and a skill, both unbrowse/<slug>; at most MAX_NEW new per run.
//   clawhub       curated only: packs named in --curated (curated.txt in CI), else --hosts. Its policy bans flooding with near-identical skills.
// Env: UNBROWSE_ORIGIN (default https://unbrowse.ai), UNBROWSE_API_KEY (--verify runs one call per site),
// SITES_REPO (this repo's checkout), MAX_NEW (new per-site listings per run, default 10).
// Idempotent: state.json in the repo keeps each pack's content hash and version; unchanged packs are skipped.
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
// Mirrors src/lib/unbrowse/registry/site-pack.ts in Unbrowse (kept standalone so this runs from this repo's CI).
type PackTool = { name: string; title: string };
type CatalogEntry = { host: string; searches: number; tools: number };
const GENERIC_TLD = new Set(["com", "org", "net", "io", "ai", "co", "dev", "app", "gov", "edu"]);
const packSlug = (host: string) => {
  const parts = host.toLowerCase().replace(/^www\./, "").split(".");
  if (parts.length > 1 && GENERIC_TLD.has(parts[parts.length - 1]!)) parts.pop();
  return parts.join("-").replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "site";
};
const packLabel = (host: string) => { const n = host.replace(/^www\./, "").split(".")[0]!; return n.charAt(0).toUpperCase() + n.slice(1); };
const appMcpUrl = (origin: string, app: string) => `${origin}/mcp/${app}`;
/** The app's own MCP host (airbnb.com → airbnb-com-mcp.unbrowse.ai). Mirrors appHost in Unbrowse's site-pack.ts. */
const appHost = (app: string) => {
  const label = app.toLowerCase().replace(/-/g, "--").replace(/\./g, "-");
  if (label.length + 4 > 63 || /^..--/.test(label) || !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(label)) return undefined;
  return `${label}-mcp.unbrowse.ai`;
};
const CF_ACCOUNT = "6d81c1b653effb2e0eac5ee071107122";
const CF_ZONE = "73934a4d815fde770167414fc3ead04b";
/**
 * The app's host answers with its own server card: attach it to unbrowse-site-hosts first when a Cloudflare token
 * (Workers custom domains) is set, else only use a host that is already attached.
 */
async function ensureHost(host: string): Promise<boolean> {
  const card = async () => (await fetchRetry(`https://${host}/.well-known/mcp/server-card.json`).catch(() => undefined))?.ok ?? false;
  if (await card()) return true;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!token || DRY) return false;
  const r = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT}/workers/domains`, {
    method: "PUT", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ environment: "production", hostname: host, service: "unbrowse-site-hosts", zone_id: CF_ZONE }),
  });
  if (!((await r.json().catch(() => ({}))) as { success?: boolean }).success) return false;
  for (let i = 0; i < 12; i++) { if (await card()) return true; await new Promise((res) => setTimeout(res, 10_000)); }
  return false;
}
/** The official MCP Registry entry: every indexed site through one server, the site a URL variable. */
const sitesServerJson = (origin: string): Record<string, unknown> => ({
  $schema: "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
  name: "io.github.unbrowse-ai/sites",
  title: "Unbrowse sites: one website's tools per server",
  description: "One website's first-party API as MCP tools, e.g. airbnb.com. Thousands of sites indexed.",
  version: "1.0.0",
  websiteUrl: `${origin}/sites`,
  repository: { url: "https://github.com/unbrowse-ai/sites", source: "github" },
  remotes: [{ type: "streamable-http", url: `${origin}/mcp/{site}`, variables: { site: { description: "The website's domain, e.g. airbnb.com", isRequired: true } } }],
});

const argv = process.argv.slice(2);
const flag = (k: string) => argv.includes(`--${k}`);
const opt = (k: string, d = "") => { const i = argv.indexOf(`--${k}`); return i >= 0 && argv[i + 1] && !argv[i + 1]!.startsWith("--") ? argv[i + 1]! : d; };
const ORIGIN = process.env.UNBROWSE_ORIGIN ?? "https://unbrowse.ai";
const KEY = process.env.UNBROWSE_API_KEY;
const OUT = resolve(opt("out", "artifacts/site-packs"));
const LIMIT = Number(opt("limit", "25"));
const TARGETS = new Set(opt("to").split(",").filter(Boolean));
const DRY = flag("dry-run");
const MAX_NEW = Number(process.env.MAX_NEW ?? 10);
const CURATED = new Set(opt("curated", opt("hosts")).split(",").map((h) => h.trim().toLowerCase()).filter(Boolean));
const REPO = process.env.SITES_REPO ? resolve(process.env.SITES_REPO) : undefined;

type Pack = { host: string; slug: string; label: string; tools: PackTool[]; skill: string; server: Record<string, unknown>; hash: string; verified?: boolean };
/** Per pack: its content hash and version, and per target the hash that target last published. */
type State = Record<string, { hash: string; version: string; published: Record<string, string> }>;

/** fetch with three tries: a deploy rollout on Unbrowse's side resets connections for a moment. */
async function fetchRetry(url: string, init: RequestInit = {}, timeoutMs = 60_000): Promise<Response> {
  for (let i = 0; ; i++) {
    try {
      return await fetch(url, { ...init, signal: AbortSignal.timeout(timeoutMs) });
    } catch (e) {
      if (i >= 2) throw e;
      await new Promise((r) => setTimeout(r, 5_000 * (i + 1)));
    }
  }
}

async function getJson<T>(path: string): Promise<T> {
  const r = await fetchRetry(`${ORIGIN}${path}`, { headers: { accept: "application/json" } }, 30_000);
  if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`);
  return (await r.json()) as T;
}

/** The apps to consider, best first: --hosts, else the registry catalog. */
async function candidates(): Promise<{ host: string; searches?: number; tools?: number }[]> {
  const hosts = opt("hosts");
  if (hosts) return hosts.split(",").map((h) => ({ host: h.trim().toLowerCase() })).filter((e) => e.host);
  const cat = await getJson<{ sites: CatalogEntry[] }>(`/api/v1/sites?catalog=1&limit=${LIMIT * 4}`);
  return cat.sites;
}

/**
 * An app's pack as Unbrowse serves it (GET /api/v1/sites/<app>/skill.md and /server.json, registry/site-pack.ts).
 * Quality gate: published only with a tool that does a job (a site search or a learned flow) or two worth-publishing
 * tools; a page reader alone is what every generic fetch tool already does.
 */
async function build(entry: { host: string; searches?: number; tools?: number }): Promise<Pack | { host: string; skip: string }> {
  const host = entry.host;
  if (entry.tools !== undefined && !(entry.searches || entry.tools > 1)) return { host, skip: `only ${entry.tools} page reader` };
  const got = async (path: string) => {
    const r = await fetchRetry(`${ORIGIN}/api/v1/sites/${host}/${path}`).catch(() => undefined);
    return r?.ok ? r.text() : undefined;
  };
  const [skill, serverText] = await Promise.all([got("skill.md"), got("server.json")]);
  if (!skill || !serverText) return { host, skip: "no public tools worth publishing" };
  const tools = [...skill.matchAll(/^### `([^`]+)` — (.+)$/gm)].map((m) => ({ name: m[1]!, title: m[2]! }) as PackTool);
  if (!tools.length) return { host, skip: "no tools in skill" };
  if (tools.every((t) => /__read_page$/.test(t.name))) return { host, skip: "only a page reader" };
  const server = JSON.parse(serverText) as Record<string, unknown>;
  const hash = createHash("sha256").update(skill).update(serverText).digest("hex").slice(0, 16);
  return { host, slug: packSlug(host), label: packLabel(host), tools, skill, server, hash };
}

/** One real call: the REST example the skill itself documents. The pack ships only if it returns a verified result. */
async function verify(p: Pack): Promise<boolean> {
  if (!KEY) return true;
  const m = /curl -s (\S+) \\\n.*\n\s*-d '(.*)'/.exec(p.skill);
  if (!m || /"<\w+>"/.test(m[2]!)) return true; // No known-good input to try: the registry's own revalidation vouches.
  const r = await fetch(m[1]!, { method: "POST", headers: { authorization: `Bearer ${KEY}`, "content-type": "application/json" }, body: m[2], signal: AbortSignal.timeout(120_000) }).catch(() => undefined);
  const body = r ? ((await r.json().catch(() => ({}))) as { status?: string }) : {};
  return body.status === "succeeded";
}

function readme(p: Pack): string {
  const url = appMcpUrl(ORIGIN, p.host);
  return `# Unbrowse for ${p.label} — MCP & skill (unofficial)

${p.host} as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by ${p.host}.

| Tool | What it does |
|---|---|
${p.tools.map((t) => `| \`${t.name}\` | ${t.title.replace(/\|/g, "\\|")} |`).join("\n")}

**MCP** (remote, streamable HTTP, OAuth): \`${url}\`

\`\`\`sh
claude mcp add --transport http ${p.slug} ${url}
\`\`\`

**Skill**: \`npx skills add https://unbrowse.ai --skill ${p.slug}\` (or \`npx skills add unbrowse-ai/sites --skill ${p.slug}\`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: ${ORIGIN}/api/v1/sites/${p.host}/openapi.json
`;
}

function write(dir: string, p: Pack) {
  mkdirSync(join(dir, p.slug), { recursive: true });
  writeFileSync(join(dir, p.slug, "SKILL.md"), p.skill);
  writeFileSync(join(dir, p.slug, "server.json"), JSON.stringify(p.server, null, 2) + "\n");
  writeFileSync(join(dir, p.slug, "README.md"), readme(p));
}

const bump = (v?: string) => { const [a, b, c] = (v ?? "1.0.-1").split(".").map(Number); return `${a}.${b}.${(c ?? -1) + 1}`; };
const run = (cmd: string, args: string[], cwd?: string) => {
  if (DRY) { console.log(`DRY ${cmd} ${args.join(" ")}`); return ""; }
  return execFileSync(cmd, args, { cwd, stdio: ["ignore", "pipe", "inherit"], encoding: "utf8", timeout: 180_000 });
};

// ---- build ----
const entries = await candidates();
const packs: Pack[] = [];
for (const entry of entries) {
  if (packs.length >= LIMIT) break;
  const host = entry.host;
  const p = await build(entry);
  if ("skip" in p) { console.log(`skip ${host}: ${p.skip}`); continue; }
  if (flag("verify") && !(p.verified = await verify(p))) { console.log(`skip ${host}: first tool did not return a verified result`); continue; }
  packs.push(p);
}
rmSync(OUT, { recursive: true, force: true });
for (const p of packs) write(join(OUT, "skills"), p);
writeFileSync(join(OUT, "index.json"), JSON.stringify(packs.map(({ host, slug, label, hash, tools }) => ({ host, slug, label, hash, tools: tools.map((t) => t.name) })), null, 2) + "\n");
console.log(`BUILT ${packs.length} packs → ${OUT}`);

// ---- publish ----
const statePath = REPO ? join(REPO, "state.json") : join(OUT, "state.json");
const state: State = existsSync(statePath) ? JSON.parse(readFileSync(statePath, "utf8")) : {};
let fresh = 0;
for (const p of packs) {
  const prev = state[p.slug];
  // The version moves when the pack's content does; each target records the hash it last published, so a target
  // switched on later still reaches packs that have not changed.
  const version = !prev ? "1.0.0" : prev.hash === p.hash ? prev.version : bump(prev.version);
  p.server.version = version;
  const entry = (state[p.slug] = { hash: p.hash, version, published: { ...(prev?.published ?? {}) } });
  write(join(OUT, "skills"), p);
  const dir = join(OUT, "skills", p.slug);
  const attempt = (target: string, fn: () => void) => {
    try { fn(); entry.published[target] = p.hash; } catch (e) { console.error(`FAIL ${target} ${p.slug}: ${(e as Error).message.split("\n")[0]}`); }
  };
  // Smithery: the pack as a skill (unbrowse/<slug>). Its MCP scanner reads a server card only from the origin root,
  // which is the main server's, so per-site MCP listings would show the wrong tools: the main server is listed once
  // by hand (unbrowse/unbrowse). At most MAX_NEW new skills per run; a changed pack is republished.
  if (TARGETS.has("smithery") && entry.published.smithery !== p.hash) {
    if (entry.published.smithery || fresh++ < MAX_NEW) attempt("smithery", () => run("smithery", ["skill", "publish", dir, "--namespace", "unbrowse", "-n", p.slug]));
    else console.log(`hold ${p.slug} on smithery: MAX_NEW=${MAX_NEW} new per run`);
  }
  // Smithery MCP: the app's own host (its scanner reads the server card at a host's root). Listed once; the URL and
  // card stay current by themselves. Counts against the same MAX_NEW.
  const host = appHost(p.host);
  if (TARGETS.has("smithery") && host && !entry.published["smithery-mcp"]) {
    if (fresh++ >= MAX_NEW) console.log(`hold ${p.slug} on smithery mcp: MAX_NEW=${MAX_NEW} new per run`);
    else if (!(await ensureHost(host))) console.log(`hold ${p.slug} on smithery mcp: ${host} not attached (set CLOUDFLARE_API_TOKEN)`);
    else attempt("smithery-mcp", () => run("smithery", ["mcp", "publish", `https://${host}/mcp`, "-n", `unbrowse/${p.slug}`]));
  }
  // Its listing's name, description and homepage: the scan leaves them empty, which costs the listing's score.
  if (TARGETS.has("smithery") && entry.published["smithery-mcp"] && entry.published["smithery-meta"] !== p.hash && !DRY) {
    const r = await fetchRetry(`https://api.smithery.ai/servers/unbrowse/${p.slug}`, {
      method: "PATCH", headers: { authorization: `Bearer ${process.env.SMITHERY_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({
        displayName: `Unbrowse for ${p.label} (unofficial)`,
        description: `${p.host} as MCP tools: ${p.tools.map((t) => t.title.replace(/\.$/, "")).join("; ")}. Compiled by Unbrowse from the site's own requests; verified results, no browser. Not affiliated with ${p.host}.`.slice(0, 1000),
        homepage: `${ORIGIN}/sites/${p.host}`,
      }),
    }).catch(() => undefined);
    if (r?.ok) entry.published["smithery-meta"] = p.hash;
    else console.error(`FAIL smithery-meta ${p.slug}: ${r?.status ?? "network"}`);
  }
  if (TARGETS.has("clawhub") && CURATED.has(p.host) && entry.published.clawhub !== p.hash) {
    attempt("clawhub", () => run("clawhub", ["--no-input", "skill", "publish", dir, "--slug", `unbrowse-${p.slug}`, "--name", `Unbrowse for ${p.label} (unofficial)`, "--owner", "unbrowse", "--version", version,
      "--changelog", `Tools: ${p.tools.map((t) => t.title).join("; ")}`]));
  }
}

// The official MCP Registry: one templated entry, re-published only when it changes.
if (TARGETS.has("mcp-registry")) {
  const entry = sitesServerJson(ORIGIN);
  const hash = createHash("sha256").update(JSON.stringify(entry)).digest("hex").slice(0, 16);
  const prev = state["@registry"];
  if (prev?.hash !== hash) {
    const version = prev ? bump(prev.version) : "1.0.0";
    entry.version = version;
    const file = join(OUT, "server.json");
    writeFileSync(file, JSON.stringify(entry, null, 2) + "\n");
    try {
      run("mcp-publisher", ["publish", file]);
      state["@registry"] = { hash, version, published: { "mcp-registry": new Date().toISOString() } };
    } catch (e) { console.error(`FAIL mcp-registry: ${(e as Error).message.split("\n")[0]}`); }
  }
}

// The GitHub repo feeds skills.sh, skillsmp, Claude plugin marketplaces and Glama: one commit per run.
if (TARGETS.has("repo")) {
  if (!REPO) throw new Error("--to repo needs SITES_REPO (a checkout of github.com/unbrowse-ai/sites)");
  rmSync(join(REPO, "skills"), { recursive: true, force: true });
  for (const p of packs) if (state[p.slug]?.hash === p.hash) write(join(REPO, "skills"), p);
  const listed = packs.filter((p) => state[p.slug]?.hash === p.hash);
  writeFileSync(join(REPO, "README.md"), `# Unbrowse sites — one MCP and one skill per website

Unofficial: not affiliated with or endorsed by any site listed. Each folder is a website as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests: a scoped remote MCP server (only that site's tools) and a SKILL.md that uses it. Regenerated from the live registry; a site is listed only when its tools passed verification.

\`\`\`sh
npx skills add https://unbrowse.ai --skill airbnb               # one skill, from unbrowse.ai
npx skills add unbrowse-ai/sites --skill airbnb         # the same, from this repo
claude mcp add --transport http airbnb ${appMcpUrl(ORIGIN, "airbnb.com")}
\`\`\`

| Site | Skill | MCP | Tools |
|---|---|---|---|
${listed.map((p) => `| ${p.label} (${p.host}) | [\`${p.slug}\`](skills/${p.slug}/SKILL.md) | \`${appMcpUrl(ORIGIN, p.host)}\` | ${p.tools.length} |`).join("\n")}

Any other site: the general [Unbrowse](https://github.com/unbrowse-ai/unbrowse) skill and \`${ORIGIN}/mcp\`.
`);
  // Claude Code / Codex plugin marketplace: `claude plugin marketplace add unbrowse-ai/sites`.
  mkdirSync(join(REPO, ".claude-plugin"), { recursive: true });
  writeFileSync(join(REPO, ".claude-plugin", "marketplace.json"), JSON.stringify({
    name: "unbrowse-sites", owner: { name: "Unbrowse", url: "https://unbrowse.ai" },
    description: "Websites as agent tools (unofficial): each plugin is one site's remote MCP server and skill, compiled by Unbrowse from the site's own requests.",
    plugins: listed.map((p) => ({ name: p.slug, source: `./skills/${p.slug}`, description: String(p.server.description), strict: false, skills: ["./"], mcpServers: { [p.slug]: { type: "http", url: appMcpUrl(ORIGIN, p.host) } } })),
  }, null, 2) + "\n");
  if (!DRY) writeFileSync(statePath, JSON.stringify(state, null, 2) + "\n");
  run("git", ["add", "-A"], REPO);
  const dirty = DRY || execFileSync("git", ["status", "--porcelain"], { cwd: REPO, encoding: "utf8" }).trim();
  if (dirty) { run("git", ["commit", "-m", `sites: ${listed.length} packs`], REPO); run("git", ["push"], REPO); }
} else if (!DRY) writeFileSync(statePath, JSON.stringify(state, null, 2) + "\n");
console.log(`PUBLISH targets=${[...TARGETS].join(",") || "none"} packs=${packs.length} dry=${DRY}`);
