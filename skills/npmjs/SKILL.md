---
name: npmjs
description: "Npmjs (npmjs.com) for agents: Search npm — through Unbrowse's scoped MCP for npmjs.com (unofficial), which replays npmjs.com's own first-party API (no browser, verified results). Use when the user wants anything from npmjs.com, e.g. search npm."
---

# Unbrowse for Npmjs (npmjs.com)

Npmjs as tools for your agent. Unofficial: not affiliated with or endorsed by npmjs.com. Unbrowse compiled these from npmjs.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no npmjs.com API key.

## Connect the npmjs.com MCP

This server is a tool scope holding only npmjs.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on npmjs.com.

```sh
claude mcp add --transport http npmjs https://unbrowse.ai/mcp/npmjs.com
codex mcp add npmjs --url https://unbrowse.ai/mcp/npmjs.com && codex mcp login npmjs
```

```json
{"mcpServers":{"npmjs":{"url":"https://unbrowse.ai/mcp/npmjs.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch npmjs.com some other way and present it as this skill's result.

## Tools

### `npmjs_com__get_search_suggestions` — Search npm

Search npm. Inputs: query. Returns data. Read-only on npmjs.com.

- `query` (string, required) — query (typed during “fill Search packages”)
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"query":"<query>"}
```

Always there too: `unbrowse_run` (a task on npmjs.com in plain words), `unbrowse_inspect`, `unbrowse_resume`, `unbrowse_scrape` and `unbrowse_map` (any page on npmjs.com), and the recorded cloud browser `unbrowse_browse_open` → `unbrowse_browse_act` → `unbrowse_browse_finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse_resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse_run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse_browse_open` on npmjs.com → `unbrowse_browse_act` → `unbrowse_browse_finish`, which compiles a new tool this server lists next time. Anything off npmjs.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse_browse_act` with `action: "autofill"` fills npmjs.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/npmjs.com/call/npmjs_com__get_search_suggestions \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/npmjs.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
