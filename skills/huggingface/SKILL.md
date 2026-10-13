---
name: huggingface
description: "Huggingface (huggingface.co) for agents: Search huggingface; Repo Search; Hugging Face User Info — through Unbrowse's scoped MCP for huggingface.co (unofficial), which replays huggingface.co's own first-party API (no browser, verified results). Use when the user wants anything from huggingface.co, e.g. search huggingface."
---

# Unbrowse for Huggingface (huggingface.co)

Huggingface as tools for your agent. Unofficial: not affiliated with or endorsed by huggingface.co. Unbrowse compiled these from huggingface.co's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no huggingface.co API key.

## Connect the huggingface.co MCP

This server is a tool scope holding only huggingface.co: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on huggingface.co.

huggingface.co also runs its own MCP server: https://huggingface.co/mcp (open; its read-only tools are among the tools below). For anything that changes your huggingface.co data, use that server directly.

```sh
claude mcp add --transport http huggingface https://unbrowse.ai/mcp/huggingface.co
codex mcp add huggingface --url https://unbrowse.ai/mcp/huggingface.co && codex mcp login huggingface
```

```json
{"mcpServers":{"huggingface":{"url":"https://unbrowse.ai/mcp/huggingface.co"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch huggingface.co some other way and present it as this skill's result.

## Tools

### `huggingface_co__get_models_json` — Search huggingface

Search huggingface. Inputs: query. Also takes the site's own parameters, each optional (left out, the recorded value is sent): sort (recorded: "trending"); withCount (recorded: "true"). Returns activeFilters, models, numItemsPerPage, numTotalItems, pageIndex. Read-only on huggingface.co.

- `query` (string, required) — query (typed during “fill Filter by name”)
- `sort` (string) — optional, e.g. "trending"
- `withCount` (string) — optional, e.g. "true"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"query":"<query>"}
```

### `huggingface_co__mcp_hub_repo_search` — Repo Search

Search Hugging Face repositories with a shared query interface. You can target models, datasets, spaces, or aggregate across multiple repo types in one call. Include links to repositories in your response. The site's own MCP tool hub_repo_search (https://huggingface.co/mcp). Inputs: author (optional) e.g. "google"; sort (optional) e.g. "trendingScore"; limit (optional) e.g. 20. Returns text. Read-only on huggingface.co.

- `author` (string) — Organization or user namespace to filter by (e.g. 'google', 'meta-llama', 'huggingface').
- `sort` (string) — Sort order (descending): trendingScore, downloads, likes, createdAt, lastModified
- `limit` (number) — Maximum number of results to return per selected repo type
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"author":"{\"author\":\"google\",\"sort\":\"trendingScore\",\"limit\":20}","sort":"trendingScore","limit":20}
```

### `huggingface_co__mcp_hf_whoami` — Hugging Face User Info

Inspect the current Hugging Face authentication context, including the account, visible organization memberships, and credential access details. Read-only and never returns credential values. The site's own MCP tool hf_whoami (https://huggingface.co/mcp). No inputs. Returns status, account, organizations, credential, guidance. Read-only on huggingface.co.

- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{}
```

Always there too: `unbrowse_run` (a task on huggingface.co in plain words), `unbrowse_inspect`, `unbrowse_resume`, `unbrowse_scrape` and `unbrowse_map` (any page on huggingface.co), and the recorded cloud browser `unbrowse_browse_open` → `unbrowse_browse_act` → `unbrowse_browse_finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse_resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse_run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse_browse_open` on huggingface.co → `unbrowse_browse_act` → `unbrowse_browse_finish`, which compiles a new tool this server lists next time. Anything off huggingface.co is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse_browse_act` with `action: "autofill"` fills huggingface.co's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/huggingface.co/call/huggingface_co__get_models_json \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/huggingface.co/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
