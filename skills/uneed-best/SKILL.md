---
name: uneed-best
description: "Uneed (uneed.best) for agents: Search products; Read the latest product launches; Read a uneed.best tool page — through Unbrowse's scoped MCP for uneed.best (unofficial), which replays uneed.best's own first-party API (no browser, verified results). Use when the user wants anything from uneed.best, e.g. search products."
---

# Unbrowse for Uneed (uneed.best)

Uneed as tools for your agent. Unofficial: not affiliated with or endorsed by uneed.best. Unbrowse compiled these from uneed.best's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no uneed.best API key.

## Connect the uneed.best MCP

This server is a tool scope holding only uneed.best: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on uneed.best.

uneed.best also runs its own MCP server: https://mcp.uneed.best/mcp (open; its read-only tools are among the tools below). For anything that changes your uneed.best data, use that server directly.

```sh
claude mcp add --transport http uneed-best https://unbrowse.ai/mcp/uneed.best
codex mcp add uneed-best --url https://unbrowse.ai/mcp/uneed.best && codex mcp login uneed-best
```

```json
{"mcpServers":{"uneed-best":{"url":"https://unbrowse.ai/mcp/uneed.best"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch uneed.best some other way and present it as this skill's result.

## Tools

### `uneed_best__get_tools_search` — Search products

Search products. Inputs: query. Returns data. Read-only on uneed.best.

- `query` (string, required) — query (typed during “fill Search for products...”)
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"query":"<query>"}
```

### `uneed_best__get_posts` — Read the latest product launches

Read the latest product launches. Takes the site's own parameters, each optional (left out, the recorded value is sent): limit (recorded: "3"). Returns data. Read-only on uneed.best.

- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.
- 1 more of the site's own parameters (locale, paging and the like), sent as recorded

```json
{}
```

### `uneed_best__read_page` — Read a uneed.best tool page

Read a uneed.best tool page. Inputs: tool. Returns the page's title, readable text and links. Read-only on uneed.best.

- `tool` (string, required)
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"tool":"<tool>"}
```

Always there too: `unbrowse_run` (a task on uneed.best in plain words), `unbrowse_inspect`, `unbrowse_resume`, `unbrowse_scrape` and `unbrowse_map` (any page on uneed.best), and the recorded cloud browser `unbrowse_browse_open` → `unbrowse_browse_act` → `unbrowse_browse_finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse_resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse_run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse_browse_open` on uneed.best → `unbrowse_browse_act` → `unbrowse_browse_finish`, which compiles a new tool this server lists next time. Anything off uneed.best is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse_browse_act` with `action: "autofill"` fills uneed.best's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/uneed.best/call/uneed_best__get_tools_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/uneed.best/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
