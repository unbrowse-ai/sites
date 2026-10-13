---
name: craigslist
description: "Craigslist (craigslist.org) for agents: Search craigslist.org; Craigslist search: posts in a city and category; Read a craigslist.org page by max_price — through Unbrowse's scoped MCP for craigslist.org (unofficial), which replays craigslist.org's own first-party API (no browser, verified results). Use when the user wants anything from craigslist.org, e.g. search craigslist.org."
---

# Unbrowse for Craigslist (craigslist.org)

Craigslist as tools for your agent. Unofficial: not affiliated with or endorsed by craigslist.org. Unbrowse compiled these from craigslist.org's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no craigslist.org API key.

## Connect the craigslist.org MCP

This server is a tool scope holding only craigslist.org: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on craigslist.org.

```sh
claude mcp add --transport http craigslist https://unbrowse.ai/mcp/craigslist.org
codex mcp add craigslist --url https://unbrowse.ai/mcp/craigslist.org && codex mcp login craigslist
```

```json
{"mcpServers":{"craigslist":{"url":"https://unbrowse.ai/mcp/craigslist.org"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch craigslist.org some other way and present it as this skill's result.

## Tools

### `sfbay_craigslist_org__render_page` — Search craigslist.org

Search craigslist.org. Inputs: max. Also takes the site's own parameters, each optional (left out, the recorded value is sent): cat (recorded: "apa"). Returns the page's title, readable text and links. Read-only on sfbay.craigslist.org.

- `max` (string, required) — max — what to search for on craigslist.org
- `cat` (string) — optional, e.g. "apa"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"max":"<max>"}
```

### `sapi_craigslist_org__get_search_full` — Craigslist search: posts in a city and category

Craigslist search: posts in a city and category. Inputs: batch; searchPath; query. Also takes the site's own parameters, each optional (left out, the recorded value is sent): cc (recorded: "US"). Returns apiVersion, configId, configTs, data, errors. Read-only on sapi.craigslist.org.

- `batch` (string, required) — batch (typed during “search”)
- `searchPath` (string, required) — searchPath (typed during “search”)
- `query` (string, required) — query (typed during “search”)
- `cc` (string) — optional, e.g. "US"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"batch":"<batch>","searchPath":"<searchPath>","query":"<query>"}
```

### `sfbay_craigslist_org__read_page` — Read a craigslist.org page by max_price

Read a craigslist.org page by max_price. Inputs: max_price. Also takes the site's own parameters, each optional (left out, the recorded value is sent): availabilityMode (recorded: 0); cat (recorded: "apa"). Returns the page's title, readable text and links. A large answer comes back as its records at data (as results); pass select for other parts. Read-only on sfbay.craigslist.org.

- `max_price` (string, required)
- `availabilityMode` (integer) — optional, e.g. 0
- `cat` (string) — optional, e.g. "apa"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing. Left out on a large answer, its records at data come back as results (the rest is named in projection).

```json
{"max_price":"<max_price>"}
```

Always there too: `unbrowse_run` (a task on craigslist.org in plain words), `unbrowse_inspect`, `unbrowse_resume`, `unbrowse_scrape` and `unbrowse_map` (any page on craigslist.org), and the recorded cloud browser `unbrowse_browse_open` → `unbrowse_browse_act` → `unbrowse_browse_finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse_resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse_run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse_browse_open` on craigslist.org → `unbrowse_browse_act` → `unbrowse_browse_finish`, which compiles a new tool this server lists next time. Anything off craigslist.org is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse_browse_act` with `action: "autofill"` fills craigslist.org's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/sfbay.craigslist.org/call/sfbay_craigslist_org__render_page \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"max":"<max>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/sfbay.craigslist.org/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
