---
name: creativecommons
description: "Creativecommons (creativecommons.org) for agents: Search creativecommons.org; Read a page on creativecommons.org — through Unbrowse's scoped MCP for creativecommons.org (unofficial), which replays creativecommons.org's own first-party API (no browser, verified results). Use when the user wants anything from creativecommons.org, e.g. search creativecommons.org."
---

# Unbrowse for Creativecommons (creativecommons.org)

Creativecommons as tools for your agent. Unofficial: not affiliated with or endorsed by creativecommons.org. Unbrowse compiled these from creativecommons.org's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no creativecommons.org API key.

## Connect the creativecommons.org MCP

This server is a tool scope holding only creativecommons.org: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on creativecommons.org.

```sh
claude mcp add --transport http creativecommons https://unbrowse.ai/mcp/creativecommons.org
codex mcp add creativecommons --url https://unbrowse.ai/mcp/creativecommons.org && codex mcp login creativecommons
```

```json
{"mcpServers":{"creativecommons":{"url":"https://unbrowse.ai/mcp/creativecommons.org"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch creativecommons.org some other way and present it as this skill's result.

## Tools

### `creativecommons_org__get_root` — Search creativecommons.org

Read root on creativecommons.org on Building tools for shared knowledge - Creative Commons (creativecommons.org). Use for requests like “search creativecommons.org for licenses”; “search creativecommons.org for commons”; “search creativecommons.org for commons — Search creativecommons.org for commons”. Learned from 2 browser traces; chains get_root. Inputs: query e.g. "licenses". Returns the page's title, readable text and links. Read-only on creativecommons.org.

- `query` (string, required) — query (typed during “fill Search”), e.g. "licenses", "commons"

```json
{"query":"licenses"}
```

### `creativecommons_org__read_page` — Read a page on creativecommons.org

Read any page on creativecommons.org — a path such as /news/2026/some-story, or a full creativecommons.org URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on creativecommons.org.

- `path` (string, required) — A page on creativecommons.org: a path like /about, or a full URL on creativecommons.org

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on creativecommons.org in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on creativecommons.org), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on creativecommons.org → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off creativecommons.org is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills creativecommons.org's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/creativecommons.org/call/creativecommons_org__get_root \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"licenses"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/creativecommons.org/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
