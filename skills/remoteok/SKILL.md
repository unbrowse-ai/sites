---
name: remoteok
description: "Remoteok (remoteok.com) for agents: Search remoteok — through Unbrowse's scoped MCP for remoteok.com (unofficial), which replays remoteok.com's own first-party API (no browser, verified results). Use when the user wants anything from remoteok.com, e.g. search remoteok."
---

# Unbrowse for Remoteok (remoteok.com)

Remoteok as tools for your agent. Unofficial: not affiliated with or endorsed by remoteok.com. Unbrowse compiled these from remoteok.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no remoteok.com API key.

## Connect the remoteok.com MCP

This server is a tool scope holding only remoteok.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on remoteok.com.

```sh
claude mcp add --transport http remoteok https://unbrowse.ai/mcp/remoteok.com
codex mcp add remoteok --url https://unbrowse.ai/mcp/remoteok.com && codex mcp login remoteok
```

```json
{"mcpServers":{"remoteok":{"url":"https://unbrowse.ai/mcp/remoteok.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch remoteok.com some other way and present it as this skill's result.

## Tools

### `remoteok_com__render_page` — Search remoteok

Search remoteok. Inputs: query. Returns the page's title, readable text and links. Read-only on remoteok.com.

- `query` (string, required) — query — what to search for on remoteok.com
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"query":"<query>"}
```

Always there too: `unbrowse.run` (a task on remoteok.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on remoteok.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on remoteok.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off remoteok.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills remoteok.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/remoteok.com/call/remoteok_com__render_page \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/remoteok.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
