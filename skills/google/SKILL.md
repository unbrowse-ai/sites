---
name: google
description: "Google (google.com) for agents: Google News search (RSS); Read google.com/travel/flights — through Unbrowse's scoped MCP for google.com (unofficial), which replays google.com's own first-party API (no browser, verified results). Use when the user wants anything from google.com, e.g. google news search (rss)."
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

### `news_google_com__get_rss_search` — Google News search (RSS)

Google News search (RSS). Inputs: query. Returns text. Read-only on news.google.com.

- `query` (string, required) — query (typed during “search”)
- `ceid` (string) — optional, e.g. "US:en"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"query":"<query>"}
```

### `google_com__read_page` — Read google.com/travel/flights

Read google.com/travel/flights. No inputs. Returns the page's title, readable text and links. Read-only on google.com.

- `tfs` (string) — optional, e.g. "CBwQARojEgoyMDI2LTExLTEwagwIAhIIL20vMDZ0MnRyBwgBEgNOUlQaIxIKMjAyNi0xMS0xN2oHCAESA05SVHIMCAISCC9tLzA2dDJ0QAFIAXABggELCP___________wGYAQE"
- `tfu` (string) — optional, e.g. "KgIIAw"
- `hl` (string) — optional, e.g. "en"
- `curr` (string) — optional, e.g. "SGD"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"tfs":"CBwQARojEgoyMDI2LTExLTEwagwIAhIIL20vMDZ0MnRyBwgBEgNOUlQaIxIKMjAyNi0xMS0xN2oHCAESA05SVHIMCAISCC9tLzA2dDJ0QAFIAXABggELCP___________wGYAQE","tfu":"KgIIAw","hl":"en","curr":"SGD"}
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
curl -s https://unbrowse.ai/api/v1/sites/google.com/call/news_google_com__get_rss_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/google.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
