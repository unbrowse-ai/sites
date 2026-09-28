---
name: ntv-co-jp
description: "Ntv (ntv.co.jp) for agents: Browse drama programs on NTV; Search NTV programs and articles by keyword — through Unbrowse's scoped MCP for ntv.co.jp (unofficial), which replays ntv.co.jp's own first-party API (no browser, verified results). Use when the user wants anything from ntv.co.jp, e.g. browse drama programs on ntv."
---

# Unbrowse for Ntv (ntv.co.jp)

Ntv as tools for your agent. Unofficial: not affiliated with or endorsed by ntv.co.jp. Unbrowse compiled these from ntv.co.jp's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no ntv.co.jp API key.

## Connect the ntv.co.jp MCP

This server is a tool scope holding only ntv.co.jp: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on ntv.co.jp.

```sh
claude mcp add --transport http ntv-co-jp https://unbrowse.ai/mcp/ntv.co.jp
codex mcp add ntv-co-jp --url https://unbrowse.ai/mcp/ntv.co.jp && codex mcp login ntv-co-jp
```

```json
{"mcpServers":{"ntv-co-jp":{"url":"https://unbrowse.ai/mcp/ntv.co.jp"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch ntv.co.jp some other way and present it as this skill's result.

## Tools

### `ntv_co_jp__get_programs_programs_json` — Browse drama programs on NTV

Browse drama programs on NTV. No inputs. Returns text. Read-only on ntv.co.jp.

- none

```json
{}
```

### `ntv_co_jp__render_page` — Search NTV programs and articles by keyword

Search NTV programs and articles by keyword. Inputs: query. Returns the page's title, readable text and links. Read-only on ntv.co.jp.

- `query` (string, required) — query — what to search for on ntv.co.jp

```json
{"query":"<query>"}
```

Always there too: `unbrowse.run` (a task on ntv.co.jp in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on ntv.co.jp), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on ntv.co.jp → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off ntv.co.jp is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills ntv.co.jp's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/ntv.co.jp/call/ntv_co_jp__get_programs_programs_json \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/ntv.co.jp/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
