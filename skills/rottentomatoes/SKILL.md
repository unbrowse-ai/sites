---
name: rottentomatoes
description: "Rottentomatoes (rottentomatoes.com) for agents: Open a movie detail page; Search movies and TV shows; Read a page on rottentomatoes.com — through Unbrowse's scoped MCP for rottentomatoes.com (unofficial), which replays rottentomatoes.com's own first-party API (no browser, verified results). Use when the user wants anything from rottentomatoes.com, e.g. open a movie detail page."
---

# Unbrowse for Rottentomatoes (rottentomatoes.com)

Rottentomatoes as tools for your agent. Unofficial: not affiliated with or endorsed by rottentomatoes.com. Unbrowse compiled these from rottentomatoes.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no rottentomatoes.com API key.

## Connect the rottentomatoes.com MCP

This server is a tool scope holding only rottentomatoes.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on rottentomatoes.com.

```sh
claude mcp add --transport http rottentomatoes https://unbrowse.ai/mcp/rottentomatoes.com
codex mcp add rottentomatoes --url https://unbrowse.ai/mcp/rottentomatoes.com && codex mcp login rottentomatoes
```

```json
{"mcpServers":{"rottentomatoes":{"url":"https://unbrowse.ai/mcp/rottentomatoes.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch rottentomatoes.com some other way and present it as this skill's result.

## Tools

### `rottentomatoes_com__get_cnapi_videos` — Open a movie detail page

Open a movie detail page.

- `type` (string) — optional, e.g. "Movie"

```json
{"type":"Movie"}
```

### `rottentomatoes_com__get_search` — Search movies and TV shows

Search movies and TV shows.

- `query` (string, required) — query (typed during “fill Search”)

```json
{"query":"<query>"}
```

### `rottentomatoes_com__read_page` — Read a page on rottentomatoes.com

Read any page on rottentomatoes.com — a path such as /news/2026/some-story, or a full rottentomatoes.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on rottentomatoes.com: a path like /about, or a full URL on rottentomatoes.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on rottentomatoes.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on rottentomatoes.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on rottentomatoes.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off rottentomatoes.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills rottentomatoes.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/rottentomatoes.com/call/rottentomatoes_com__get_cnapi_videos \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"type":"Movie"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/rottentomatoes.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
