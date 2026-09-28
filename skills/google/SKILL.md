---
name: google
description: "Google (google.com) for agents: Google Flights SIN-BKK fare compare; Search Google results; Search thinkwithgoogle.com; Read a page on google.com — through Unbrowse's scoped MCP for google.com (unofficial), which replays google.com's own first-party API (no browser, verified results). Use when the user wants anything from google.com, e.g. google flights sin-bkk fare compare."
---

# Unbrowse for Google (google.com)

Google as tools for your agent. Unofficial: not affiliated with or endorsed by google.com. Unbrowse compiled these from google.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no google.com API key.

## Connect the google.com MCP

This server is a tool scope holding only google.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on google.com.

```sh
claude mcp add --transport http google https://unbrowse.ai/mcp/google.com
codex mcp add google --url https://unbrowse.ai/mcp/google.com && codex mcp login google
```

```json
{"mcpServers":{"google":{"url":"https://unbrowse.ai/mcp/google.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch google.com some other way and present it as this skill's result.

## Tools

### `google_com__get_travel_flights` — Google Flights SIN-BKK fare compare

Google Flights SIN-BKK fare compare.

- `q` (string) — optional, e.g. "Flights from Singapore to Bangkok on 2026-11-14"

```json
{"q":"Flights from Singapore to Bangkok on 2026-11-14"}
```

### `google_com__get_complete_s` — Search Google results

Search Google results.

- `q` (string, required)
- `gs_pcrt` (integer, required) — gs pcrt
- `sei` (string) — optional, e.g. "SBi5aoHBMq_gseMPzoHt8QY"
- `cp` (integer) — optional, e.g. "0"
- `client` (string) — optional, e.g. "gws-wiz-serp"
- `xssi` (string) — optional, e.g. "t"
- `authuser` (integer) — optional, e.g. "0"
- `pq` (string) — optional, e.g. "guatemala capital"
- `psi` (string) — optional, e.g. "SRi5at-eAc2fseMP6ZCTsQU.1790515274369"
- `dpr` (integer) — optional, e.g. "1"
- `nolsbt` (integer) — optional, e.g. "1"
- 1 more of the site's own parameters (locale, paging and the like), sent as recorded

```json
{"q":"<q>","gs_pcrt":"<gs_pcrt>"}
```

### `business_google_com__get_resources_search` — Search thinkwithgoogle.com

Read resources search on business.google.com on Think with Google - Marketing Research, Insights, and Trends (business.google.com) in one call. Recorded for: “search business.google.com for article”; “search business.google.com for description”; “search business.google.com for description — Search thinkwithgoogle.com for description”. Learned from 2 browser traces; chains get_resources_search.

- `query` (string, required) — query (typed during “fill Search”), e.g. "article", "description"

```json
{"query":"article"}
```

### `google_com__read_page` — Read a page on google.com

Read any page on google.com — a path such as /news/2026/some-story, or a full google.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on google.com: a path like /about, or a full URL on google.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on google.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on google.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on google.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off google.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills google.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/google.com/call/google_com__get_travel_flights \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"q":"Flights from Singapore to Bangkok on 2026-11-14"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/google.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
