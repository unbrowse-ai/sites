---
name: semanticscholar
description: "Semanticscholar (semanticscholar.org) for agents: Paper detail with citations and references; Search semanticscholar — through Unbrowse's scoped MCP for semanticscholar.org (unofficial), which replays semanticscholar.org's own first-party API (no browser, verified results). Use when the user wants anything from semanticscholar.org, e.g. paper detail with citations and references."
---

# Unbrowse for Semanticscholar (semanticscholar.org)

Semanticscholar as tools for your agent. Unofficial: not affiliated with or endorsed by semanticscholar.org. Unbrowse compiled these from semanticscholar.org's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no semanticscholar.org API key.

## Connect the semanticscholar.org MCP

This server is a tool scope holding only semanticscholar.org: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on semanticscholar.org.

```sh
claude mcp add --transport http semanticscholar https://unbrowse.ai/mcp/semanticscholar.org
codex mcp add semanticscholar --url https://unbrowse.ai/mcp/semanticscholar.org && codex mcp login semanticscholar
```

```json
{"mcpServers":{"semanticscholar":{"url":"https://unbrowse.ai/mcp/semanticscholar.org"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch semanticscholar.org some other way and present it as this skill's result.

## Tools

### `semanticscholar_org__get_paper_by_id` — Paper detail with citations and references

Paper detail with citations and references. Inputs: q; query_string. Also takes the site's own parameters, each optional (left out, the recorded value is sent): sort (recorded: "relevance"); page (recorded: 1); pageSize (recorded: 10); sort_post_search (recorded: "relevance"); yearFilter; requireViewablePdf (recorded: false). Mid-run it asks you to pick selected_result from the options it found (status input_required). Returns responseType, paper, citedPapers, figureExtractions, skipperExperiments, citationSortAvailability. Read-only on semanticscholar.org.

- `q` (string, required)
- `query_string` (string, required) — query string
- `sort` (string) — optional, e.g. "relevance"
- `page` (integer) — optional, e.g. 1
- `sort_post_search` (string) — optional, e.g. "relevance"
- `yearFilter` (string) — optional, e.g. null
- `requireViewablePdf` (string) — optional, e.g. false
- `hydrateWithDdb` (string) — optional, e.g. true
- `includeTldrs` (string) — optional, e.g. true
- `performTitleMatch` (string) — optional, e.g. true
- `includeBadges` (string) — optional, e.g. true
- `getQuerySuggestions` (string) — optional, e.g. false
- `includePdfVisibility` (string) — optional, e.g. true
- `requireSlug` (string) — optional, e.g. "true"
- `aggregateCitationsByIntent` (string) — optional, e.g. "true"
- `withEntitlements` (string) — optional, e.g. "true"
- `citedPapersLimit` (integer) — optional, e.g. "10"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.
- 1 more of the site's own parameters (locale, paging and the like), sent as recorded

```json
{"q":"<q>","query_string":"<query_string>"}
```

### `semanticscholar_org__post_search` — Search semanticscholar

Search semanticscholar. Inputs: query. Also takes the site's own parameters, each optional (left out, the recorded value is sent): page (recorded: 1); pageSize (recorded: 10); sort (recorded: "relevance"); yearFilter; requireViewablePdf (recorded: false); hydrateWithDdb (recorded: true). Returns results, query, querySuggestions, totalPages, totalResults, stats, matchedAuthors, matchedEntity. Read-only on semanticscholar.org.

- `query` (string, required) — query (typed during “fill Search text”)
- `page` (integer) — optional, e.g. 1
- `sort` (string) — optional, e.g. "relevance"
- `yearFilter` (string) — optional, e.g. null
- `requireViewablePdf` (string) — optional, e.g. false
- `hydrateWithDdb` (string) — optional, e.g. true
- `includeTldrs` (string) — optional, e.g. true
- `performTitleMatch` (string) — optional, e.g. true
- `includeBadges` (string) — optional, e.g. true
- `getQuerySuggestions` (string) — optional, e.g. false
- `includePdfVisibility` (string) — optional, e.g. true
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.
- 1 more of the site's own parameters (locale, paging and the like), sent as recorded

```json
{"query":"<query>"}
```

Always there too: `unbrowse_run` (a task on semanticscholar.org in plain words), `unbrowse_inspect`, `unbrowse_resume`, `unbrowse_scrape` and `unbrowse_map` (any page on semanticscholar.org), and the recorded cloud browser `unbrowse_browse_open` → `unbrowse_browse_act` → `unbrowse_browse_finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse_resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse_run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse_browse_open` on semanticscholar.org → `unbrowse_browse_act` → `unbrowse_browse_finish`, which compiles a new tool this server lists next time. Anything off semanticscholar.org is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse_browse_act` with `action: "autofill"` fills semanticscholar.org's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/semanticscholar.org/call/semanticscholar_org__get_paper_by_id \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"q":"<q>","query_string":"<query_string>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/semanticscholar.org/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
