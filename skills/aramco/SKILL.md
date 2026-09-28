---
name: aramco
description: "Aramco (aramco.com) for agents: Open a news article; Search news articles; Read a page on aramco.com — through Unbrowse's scoped MCP for aramco.com (unofficial), which replays aramco.com's own first-party API (no browser, verified results). Use when the user wants anything from aramco.com, e.g. open a news article."
---

# Unbrowse for Aramco (aramco.com)

Aramco as tools for your agent. Unofficial: not affiliated with or endorsed by aramco.com. Unbrowse compiled these from aramco.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no aramco.com API key.

## Connect the aramco.com MCP

This server is a tool scope holding only aramco.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on aramco.com.

```sh
claude mcp add --transport http aramco https://unbrowse.ai/mcp/aramco.com
codex mcp add aramco --url https://unbrowse.ai/mcp/aramco.com && codex mcp login aramco
```

```json
{"mcpServers":{"aramco":{"url":"https://unbrowse.ai/mcp/aramco.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch aramco.com some other way and present it as this skill's result.

## Tools

### `aramco_com__get_render_jss` — Open a news article

Open a news article. Inputs: name. Returns sitecore. Read-only on aramco.com.

- `name` (string, required)
- `sc_lang` (string) — optional, e.g. "en"
- `tracking` (string) — optional, e.g. "true"

```json
{"name":"<name>"}
```

### `aramco_com__get_article` — Search news articles

Search news articles. Inputs: name (optional); query. Returns results, resultFacets, query, page, totalResults, resultsOnPage, visiblePagesCount, totalPagesCount. Read-only on aramco.com.

- `name` (string)
- `query` (string, required) — query (typed during “fill Search articles”)
- `sc_lang` (string) — optional, e.g. "en"
- `page` (integer) — optional, e.g. "0"
- `multisite` (string) — optional, e.g. "false"
- 1 more of the site's own parameters (locale, paging and the like), sent as recorded

```json
{"query":"<query>"}
```

### `aramco_com__read_page` — Read a page on aramco.com

Read any page on aramco.com — a path such as /news/2026/some-story, or a full aramco.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on aramco.com.

- `path` (string, required) — A page on aramco.com: a path like /about, or a full URL on aramco.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on aramco.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on aramco.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on aramco.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off aramco.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills aramco.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/aramco.com/call/aramco_com__get_render_jss \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"name":"<name>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/aramco.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
