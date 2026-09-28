---
name: almasryalyoum
description: "Almasryalyoum (almasryalyoum.com) for agents: Search news articles; Open a news article; Read a page on almasryalyoum.com — through Unbrowse's scoped MCP for almasryalyoum.com (unofficial), which replays almasryalyoum.com's own first-party API (no browser, verified results). Use when the user wants anything from almasryalyoum.com, e.g. search news articles."
---

# Unbrowse for Almasryalyoum (almasryalyoum.com)

Almasryalyoum as tools for your agent. Unofficial: not affiliated with or endorsed by almasryalyoum.com. Unbrowse compiled these from almasryalyoum.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no almasryalyoum.com API key.

## Connect the almasryalyoum.com MCP

This server is a tool scope holding only almasryalyoum.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on almasryalyoum.com.

```sh
claude mcp add --transport http almasryalyoum https://unbrowse.ai/mcp/almasryalyoum.com
codex mcp add almasryalyoum --url https://unbrowse.ai/mcp/almasryalyoum.com && codex mcp login almasryalyoum
```

```json
{"mcpServers":{"almasryalyoum":{"url":"https://unbrowse.ai/mcp/almasryalyoum.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch almasryalyoum.com some other way and present it as this skill's result.

## Tools

### `almasryalyoum_com__render_page` — Search news articles

Search news articles.

- `query` (string, required) — query — what to search for on almasryalyoum.com

```json
{"query":"<query>"}
```

### `almasryalyoum_com__get_ajax_widgets_article` — Open a news article

Open a news article.

- `np_page_id` (integer) — optional, e.g. "502"

```json
{"np_page_id":502}
```

### `almasryalyoum_com__read_page` — Read a page on almasryalyoum.com

Read any page on almasryalyoum.com — a path such as /news/2026/some-story, or a full almasryalyoum.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on almasryalyoum.com: a path like /about, or a full URL on almasryalyoum.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on almasryalyoum.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on almasryalyoum.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on almasryalyoum.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off almasryalyoum.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills almasryalyoum.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/almasryalyoum.com/call/almasryalyoum_com__render_page \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/almasryalyoum.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
