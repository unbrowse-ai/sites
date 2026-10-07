---
name: carousell-sg
description: "Carousell (carousell.sg) for agents: Search listings by query with max price and sort order; Search Carousell listings — through Unbrowse's scoped MCP for carousell.sg (unofficial), which replays carousell.sg's own first-party API (no browser, verified results). Use when the user wants anything from carousell.sg, e.g. search listings by query with max price and sort order."
---

# Unbrowse for Carousell (carousell.sg)

Carousell as tools for your agent. Unofficial: not affiliated with or endorsed by carousell.sg. Unbrowse compiled these from carousell.sg's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no carousell.sg API key.

## Connect the carousell.sg MCP

This server is a tool scope holding only carousell.sg: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on carousell.sg.

```sh
claude mcp add --transport http carousell-sg https://unbrowse.ai/mcp/carousell.sg
codex mcp add carousell-sg --url https://unbrowse.ai/mcp/carousell.sg && codex mcp login carousell-sg
```

```json
{"mcpServers":{"carousell-sg":{"url":"https://unbrowse.ai/mcp/carousell.sg"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch carousell.sg some other way and present it as this skill's result.

## Tools

### `carousell_sg__get_search_macbook_air` — Search listings by query with max price and sort order

Search listings by query with max price and sort order. Inputs: name. Returns the page's title, readable text and links. Read-only on carousell.sg.

- `name` (string, required)
- `price_max` (integer) — optional, e.g. "800"
- `sort_by` (integer) — optional, e.g. "2"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"name":"<name>"}
```

### `carousell_sg__read_page` — Search Carousell listings

Search Carousell listings. Inputs: search_query. Returns the page's title, readable text and links. A large answer comes back as its records at links (as results); pass select for other parts. Read-only on carousell.sg.

- `search_query` (string, required)
- `addRecent` (string) — optional, e.g. "true"
- `canChangeKeyword` (string) — optional, e.g. "true"
- `includeSuggestions` (string) — optional, e.g. "true"
- `t_search_query_source` (string) — optional, e.g. "direct_search"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing. Left out on a large answer, its records at links come back as results (the rest is named in projection).

```json
{"search_query":"<search_query>"}
```

Always there too: `unbrowse.run` (a task on carousell.sg in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on carousell.sg), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on carousell.sg → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off carousell.sg is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills carousell.sg's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/carousell.sg/call/carousell_sg__get_search_macbook_air \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"name":"<name>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/carousell.sg/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
