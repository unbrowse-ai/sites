---
name: changiairport
description: "Changiairport (changiairport.com) for agents: Create search all on www.changiairport.com — Changi Airport Departures: Live Flight Status; Search changiairport.com; Changi Airport departures listing; Read a page on changiairport.com — through Unbrowse's scoped MCP for changiairport.com (unofficial), which replays changiairport.com's own first-party API (no browser, verified results). Use when the user wants anything from changiairport.com, e.g. create search all on www.changiairport.com — changi airport departures: live flight status."
---

# Unbrowse for Changiairport (changiairport.com)

Changiairport as tools for your agent. Unofficial: not affiliated with or endorsed by changiairport.com. Unbrowse compiled these from changiairport.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no changiairport.com API key.

## Connect the changiairport.com MCP

This server is a tool scope holding only changiairport.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on changiairport.com.

```sh
claude mcp add --transport http changiairport https://unbrowse.ai/mcp/changiairport.com
codex mcp add changiairport --url https://unbrowse.ai/mcp/changiairport.com && codex mcp login changiairport
```

```json
{"mcpServers":{"changiairport":{"url":"https://unbrowse.ai/mcp/changiairport.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch changiairport.com some other way and present it as this skill's result.

## Tools

### `changiairport_com__post_search_all` — Create search all on www.changiairport.com — Changi Airport Departures: Live Flight Status

Create search all on www.changiairport.com — Changi Airport Departures: Live Flight Status.

- `search` (string, required) — search (typed during “fill search”)
- `status` (string) — optional, e.g. "ARR"
- `type` (string) — optional, e.g. "Flight"
- `scheduledDate` (string) — optional, e.g. "2026-09-27"

```json
{"search":"<search>"}
```

### `changiairport_com__get_autocomplete_web` — Search changiairport.com

Read autocomplete web on www.changiairport.com on Airport (www.changiairport.com) in one call. Recorded for: “search www.changiairport.com for airport”; “search www.changiairport.com for changi”; “search www.changiairport.com for changi — Search changiairport.com for changi”. Learned from 2 browser traces; chains get_en_search_html → get_autocomplete_web.

- `query` (string, required) — query (typed during “fill Search for Arrival Fli”), e.g. "airport", "changi"
- `status` (string) — optional, e.g. "ARR"
- `type` (string) — optional, e.g. "Flight"
- `scheduledDate` (string) — optional, e.g. "2026-09-26"
- `data_type` (string) — optional, e.g. ""

```json
{"query":"airport"}
```

### `changiairport_com__post_anonymous` — Changi Airport departures listing

Changi Airport departures listing.

- none

```json
{}
```

### `changiairport_com__read_page` — Read a page on changiairport.com

Read any page on changiairport.com — a path such as /news/2026/some-story, or a full changiairport.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on changiairport.com: a path like /about, or a full URL on changiairport.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on changiairport.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on changiairport.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on changiairport.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off changiairport.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills changiairport.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/changiairport.com/call/changiairport_com__post_search_all \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"search":"<search>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/changiairport.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
