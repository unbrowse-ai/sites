---
name: overdrive
description: "Overdrive (overdrive.com) for agents: Find a library; Search titles; Read a page on overdrive.com — through Unbrowse's scoped MCP for overdrive.com (unofficial), which replays overdrive.com's own first-party API (no browser, verified results). Use when the user wants anything from overdrive.com, e.g. find a library."
---

# Unbrowse for Overdrive (overdrive.com)

Overdrive as tools for your agent. Unofficial: not affiliated with or endorsed by overdrive.com. Unbrowse compiled these from overdrive.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no overdrive.com API key.

## Connect the overdrive.com MCP

This server is a tool scope holding only overdrive.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on overdrive.com.

```sh
claude mcp add --transport http overdrive https://unbrowse.ai/mcp/overdrive.com
codex mcp add overdrive --url https://unbrowse.ai/mcp/overdrive.com && codex mcp login overdrive
```

```json
{"mcpServers":{"overdrive":{"url":"https://unbrowse.ai/mcp/overdrive.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch overdrive.com some other way and present it as this skill's result.

## Tools

### `overdrive_com__get_mapbox_find_libraries_by_query` — Find a library

Find a library. Inputs: location. Returns data. Read-only on overdrive.com.

- `location` (string, required) — location (typed during “fill Enter library name, location, or postal code:”)
- `includePublicLibraries` (string) — optional, e.g. "true"
- `includeSchoolLibraries` (string) — optional, e.g. "true"
- `sort` (string) — optional, e.g. "distance"

```json
{"location":"<location>"}
```

### `overdrive_com__get_search` — Search titles

Search titles. Inputs: query. Returns the page's title, readable text and links. Read-only on overdrive.com.

- `query` (string, required) — query (typed during “fill Search by title or author”)

```json
{"query":"<query>"}
```

### `overdrive_com__read_page` — Read a page on overdrive.com

Read any page on overdrive.com — a path such as /news/2026/some-story, or a full overdrive.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on overdrive.com.

- `path` (string, required) — A page on overdrive.com: a path like /about, or a full URL on overdrive.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on overdrive.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on overdrive.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on overdrive.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off overdrive.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills overdrive.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/overdrive.com/call/overdrive_com__get_mapbox_find_libraries_by_query \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"location":"<location>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/overdrive.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
