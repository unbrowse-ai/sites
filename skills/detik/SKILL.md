---
name: detik
description: "Detik (detik.com) for agents: Create anonymous on detik.com — detikcom - Informasi Berita Terkini dan Terbaru Hari Ini; Search news on detik; Search detik.com; Read a page on detik.com — through Unbrowse's scoped MCP for detik.com (unofficial), which replays detik.com's own first-party API (no browser, verified results). Use when the user wants anything from detik.com, e.g. create anonymous on detik.com — detikcom - informasi berita terkini dan terbaru hari ini."
---

# Unbrowse for Detik (detik.com)

Detik as tools for your agent. Unofficial: not affiliated with or endorsed by detik.com. Unbrowse compiled these from detik.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no detik.com API key.

## Connect the detik.com MCP

This server is a tool scope holding only detik.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on detik.com.

```sh
claude mcp add --transport http detik https://unbrowse.ai/mcp/detik.com
codex mcp add detik --url https://unbrowse.ai/mcp/detik.com && codex mcp login detik
```

```json
{"mcpServers":{"detik":{"url":"https://unbrowse.ai/mcp/detik.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch detik.com some other way and present it as this skill's result.

## Tools

### `detik_com__post_anonymous` — Create anonymous on detik.com — detikcom - Informasi Berita Terkini dan Terbaru Hari Ini

Create anonymous on detik.com — detikcom - Informasi Berita Terkini dan Terbaru Hari Ini.

- `query` (string, required)

```json
{"query":"<query>"}
```

### `detik_com__get_search_searchall` — Search news on detik

Search news on detik.

- `query` (string, required)

```json
{"query":"<query>"}
```

### `detik_com__get_search` — Search detik.com

Search detik.com with its own search (homepage search form) and read the results page as title, text and links. One first-party HTTP request, no browser.

- `query` (string, required) — query — what to search for on detik.com

```json
{"query":"karhutla"}
```

### `detik_com__read_page` — Read a page on detik.com

Read any page on detik.com — a path such as /news/2026/some-story, or a full detik.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on detik.com: a path like /about, or a full URL on detik.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on detik.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on detik.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on detik.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off detik.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills detik.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/detik.com/call/detik_com__post_anonymous \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/detik.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
