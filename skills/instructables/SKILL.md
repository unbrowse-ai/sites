---
name: instructables
description: "Instructables (instructables.com) for agents: Search instructables — through Unbrowse's scoped MCP for instructables.com (unofficial), which replays instructables.com's own first-party API (no browser, verified results). Use when the user wants anything from instructables.com, e.g. search instructables."
---

# Unbrowse for Instructables (instructables.com)

Instructables as tools for your agent. Unofficial: not affiliated with or endorsed by instructables.com. Unbrowse compiled these from instructables.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no instructables.com API key.

## Connect the instructables.com MCP

This server is a tool scope holding only instructables.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on instructables.com.

```sh
claude mcp add --transport http instructables https://unbrowse.ai/mcp/instructables.com
codex mcp add instructables --url https://unbrowse.ai/mcp/instructables.com && codex mcp login instructables
```

```json
{"mcpServers":{"instructables":{"url":"https://unbrowse.ai/mcp/instructables.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch instructables.com some other way and present it as this skill's result.

## Tools

### `instructables_com__get_documents_search` — Search instructables

Search instructables. Inputs: query. Also takes the site's own parameters, each optional (left out, the recorded value is sent): query_by (recorded: "title,stepBody,screenName"); page (recorded: "1"); sort_by (recorded: "_text_match:desc"); include_fields (recorded: "title,urlString,coverImageUrl,screenName,favorites,views,primaryClassification,featureFlag,prizeLevel,IMadeItCount"); filter_by (recorded: "status:=PUBLISHED && featureFlag:=true && indexTags:!=external"); per_page (recorded: "50"). Returns facet_counts, found, hits, page, request_params, search_cutoff. Read-only on instructables.com.

- `query` (string, required) — query (typed during “fill Search”)
- `query_by` (string) — optional, e.g. "title,stepBody,screenName"
- `page` (integer) — optional, e.g. "1"
- `sort_by` (string) — optional, e.g. "_text_match:desc"
- `include_fields` (string) — optional, e.g. "title,urlString,coverImageUrl,screenName,favorites,views,primaryClassification,featureFlag,prizeLevel,IMadeItCount"
- `filter_by` (string) — optional, e.g. "status:=PUBLISHED && featureFlag:=true && indexTags:!=external"
- `per_page` (integer) — optional, e.g. "50"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"query":"<query>"}
```

Always there too: `unbrowse_run` (a task on instructables.com in plain words), `unbrowse_inspect`, `unbrowse_resume`, `unbrowse_scrape` and `unbrowse_map` (any page on instructables.com), and the recorded cloud browser `unbrowse_browse_open` → `unbrowse_browse_act` → `unbrowse_browse_finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse_resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse_run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse_browse_open` on instructables.com → `unbrowse_browse_act` → `unbrowse_browse_finish`, which compiles a new tool this server lists next time. Anything off instructables.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse_browse_act` with `action: "autofill"` fills instructables.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/instructables.com/call/instructables_com__get_documents_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/instructables.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
