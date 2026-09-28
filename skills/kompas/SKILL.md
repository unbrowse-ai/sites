---
name: kompas
description: "Kompas (kompas.com) for agents: Search news; Open an article page; Browse category listing — through Unbrowse's scoped MCP for kompas.com (unofficial), which replays kompas.com's own first-party API (no browser, verified results). Use when the user wants anything from kompas.com, e.g. search news."
---

# Unbrowse for Kompas (kompas.com)

Kompas as tools for your agent. Unofficial: not affiliated with or endorsed by kompas.com. Unbrowse compiled these from kompas.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no kompas.com API key.

## Connect the kompas.com MCP

This server is a tool scope holding only kompas.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on kompas.com.

```sh
claude mcp add --transport http kompas https://unbrowse.ai/mcp/kompas.com
codex mcp add kompas --url https://unbrowse.ai/mcp/kompas.com && codex mcp login kompas
```

```json
{"mcpServers":{"kompas":{"url":"https://unbrowse.ai/mcp/kompas.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch kompas.com some other way and present it as this skill's result.

## Tools

### `kompas_com__get_search` — Search news

Search news. Inputs: query. Returns the page's title, readable text and links. Read-only on kompas.com.

- `query` (string, required) — query (typed during “fill Cari tokoh, topik atau peristiwa”)

```json
{"query":"<query>"}
```

### `kompas_com__get_list` — Open an article page

Open an article page. Inputs: position. Returns result, source, status. Read-only on kompas.com.

- `position` (string, required)
- `json` (string) — optional, e.g. ""
- 1 more of the site's own parameters (locale, paging and the like), sent as recorded

```json
{"position":"<position>"}
```

### `kompas_com__read_page` — Browse category listing

Browse category listing. Inputs: name. Returns the page's title, readable text and links. Read-only on kompas.com.

- `name` (string, required)

```json
{"name":"<name>"}
```

Always there too: `unbrowse.run` (a task on kompas.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on kompas.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on kompas.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off kompas.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills kompas.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/kompas.com/call/kompas_com__get_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/kompas.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
