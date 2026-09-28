---
name: archlinux
description: "Archlinux (archlinux.org) for agents: Read latest news; Search packages; Read a page on archlinux.org — through Unbrowse's scoped MCP for archlinux.org (unofficial), which replays archlinux.org's own first-party API (no browser, verified results). Use when the user wants anything from archlinux.org, e.g. read latest news."
---

# Unbrowse for Archlinux (archlinux.org)

Archlinux as tools for your agent. Unofficial: not affiliated with or endorsed by archlinux.org. Unbrowse compiled these from archlinux.org's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no archlinux.org API key.

## Connect the archlinux.org MCP

This server is a tool scope holding only archlinux.org: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on archlinux.org.

```sh
claude mcp add --transport http archlinux https://unbrowse.ai/mcp/archlinux.org
codex mcp add archlinux --url https://unbrowse.ai/mcp/archlinux.org && codex mcp login archlinux
```

```json
{"mcpServers":{"archlinux":{"url":"https://unbrowse.ai/mcp/archlinux.org"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch archlinux.org some other way and present it as this skill's result.

## Tools

### `archlinux_org__get_news` — Read latest news

Read latest news.

- `page` (integer) — optional, e.g. "2"

```json
{"page":2}
```

### `archlinux_org__get_packages` — Search packages

Search packages.

- `query` (string, required) — query (typed during “fill Keywords”)
- `sort` (string) — optional, e.g. ""
- `maintainer` (string) — optional, e.g. ""
- `flagged` (string) — optional, e.g. ""

```json
{"query":"<query>"}
```

### `archlinux_org__read_page` — Read a page on archlinux.org

Read any page on archlinux.org — a path such as /news/2026/some-story, or a full archlinux.org URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on archlinux.org: a path like /about, or a full URL on archlinux.org

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on archlinux.org in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on archlinux.org), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on archlinux.org → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off archlinux.org is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills archlinux.org's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/archlinux.org/call/archlinux_org__get_news \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"page":2}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/archlinux.org/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
