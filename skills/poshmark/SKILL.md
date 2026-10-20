---
name: poshmark
description: "Poshmark (poshmark.com) for agents: Search marketplace listings by keyword — through Unbrowse's scoped MCP for poshmark.com (unofficial), which replays poshmark.com's own first-party API (no browser, verified results). Use when the user wants anything from poshmark.com, e.g. search marketplace listings by keyword."
---

# Unbrowse for Poshmark (poshmark.com)

Poshmark as tools for your agent. Unofficial: not affiliated with or endorsed by poshmark.com. Unbrowse compiled these from poshmark.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no poshmark.com API key.

## Connect the poshmark.com MCP

This server is a tool scope holding only poshmark.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on poshmark.com.

```sh
claude mcp add --transport http poshmark https://unbrowse.ai/mcp/poshmark.com
codex mcp add poshmark --url https://unbrowse.ai/mcp/poshmark.com && codex mcp login poshmark
```

```json
{"mcpServers":{"poshmark":{"url":"https://unbrowse.ai/mcp/poshmark.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch poshmark.com some other way and present it as this skill's result.

## Tools

### `poshmark_com__get_search` — Search marketplace listings by keyword

Search marketplace listings by keyword. Inputs: second_search_query. Also takes the site's own parameters, each optional (left out, the recorded value is sent): type (recorded: "listings"). Returns the page's title, readable text and links. Read-only on poshmark.com.

- `second_search_query` (string, required) — second search query (typed during “fill Search”)
- `type` (string) — optional, e.g. "listings"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"second_search_query":"<second_search_query>"}
```

Always there too: `unbrowse_run` (a task on poshmark.com in plain words), `unbrowse_inspect`, `unbrowse_resume`, `unbrowse_scrape` and `unbrowse_map` (any page on poshmark.com), and the recorded cloud browser `unbrowse_browse_open` → `unbrowse_browse_act` → `unbrowse_browse_finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse_resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse_run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse_browse_open` on poshmark.com → `unbrowse_browse_act` → `unbrowse_browse_finish`, which compiles a new tool this server lists next time. Anything off poshmark.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse_browse_act` with `action: "autofill"` fills poshmark.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/poshmark.com/call/poshmark_com__get_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"second_search_query":"<second_search_query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/poshmark.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
