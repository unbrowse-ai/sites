---
name: bing
description: "Bing (bing.com) for agents: Search bing — through Unbrowse's scoped MCP for bing.com (unofficial), which replays bing.com's own first-party API (no browser, verified results). Use when the user wants anything from bing.com, e.g. search bing."
---

# Unbrowse for Bing (bing.com)

Bing as tools for your agent. Unofficial: not affiliated with or endorsed by bing.com. Unbrowse compiled these from bing.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no bing.com API key.

## Connect the bing.com MCP

This server is a tool scope holding only bing.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on bing.com.

```sh
claude mcp add --transport http bing https://unbrowse.ai/mcp/bing.com
codex mcp add bing --url https://unbrowse.ai/mcp/bing.com && codex mcp login bing
```

```json
{"mcpServers":{"bing":{"url":"https://unbrowse.ai/mcp/bing.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch bing.com some other way and present it as this skill's result.

## Tools

### `bing_com__get_as_suggestions` — Search bing

Search bing. Inputs: query; cp (optional). Also takes the site's own parameters, each optional (left out, the recorded value is sent): pt (recorded: "page.home"); csr (recorded: "1"); zis (recorded: "1"); pths (recorded: "1"); mmasync (recorded: "1"); ptn (recorded: "Homepage"). Returns s, i. Read-only on bing.com.

- `query` (string, required) — query (typed during “fill Enter your search here - Search suggestions will show as you type”)
- `cp` (integer)
- `pt` (string) — optional, e.g. "page.home"
- `csr` (integer) — optional, e.g. "1"
- `zis` (integer) — optional, e.g. "1"
- `pths` (integer) — optional, e.g. "1"
- `mmasync` (integer) — optional, e.g. "1"
- `ptn` (string) — optional, e.g. "Homepage"
- `IID` (string) — optional, e.g. "SBI"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"query":"<query>"}
```

Always there too: `unbrowse_run` (a task on bing.com in plain words), `unbrowse_inspect`, `unbrowse_resume`, `unbrowse_scrape` and `unbrowse_map` (any page on bing.com), and the recorded cloud browser `unbrowse_browse_open` → `unbrowse_browse_act` → `unbrowse_browse_finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse_resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse_run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse_browse_open` on bing.com → `unbrowse_browse_act` → `unbrowse_browse_finish`, which compiles a new tool this server lists next time. Anything off bing.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse_browse_act` with `action: "autofill"` fills bing.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/bing.com/call/bing_com__get_as_suggestions \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/bing.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
