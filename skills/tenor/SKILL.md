---
name: tenor
description: "Tenor (tenor.com) for agents: Search GIFs; Search tenor.com; Open a GIF detail page — through Unbrowse's scoped MCP for tenor.com (unofficial), which replays tenor.com's own first-party API (no browser, verified results). Use when the user wants anything from tenor.com, e.g. search gifs."
---

# Unbrowse for Tenor (tenor.com)

Tenor as tools for your agent. Unofficial: not affiliated with or endorsed by tenor.com. Unbrowse compiled these from tenor.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no tenor.com API key.

## Connect the tenor.com MCP

This server is a tool scope holding only tenor.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on tenor.com.

```sh
claude mcp add --transport http tenor https://unbrowse.ai/mcp/tenor.com
codex mcp add tenor --url https://unbrowse.ai/mcp/tenor.com && codex mcp login tenor
```

```json
{"mcpServers":{"tenor":{"url":"https://unbrowse.ai/mcp/tenor.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch tenor.com some other way and present it as this skill's result.

## Tools

### `tenor_com__get_search_suggestions` — Search GIFs

Search GIFs.

- `query` (string, required) — query (typed during “fill Search for GIFs and Stickers”)
- `appversion` (string) — optional, e.g. "browser-r260623-1"
- `prettyPrint` (string) — optional, e.g. "false"
- 2 more of the site's own parameters (locale, paging and the like), sent as recorded

```json
{"query":"<query>"}
```

### `tenor_com__get_search` — Search tenor.com

Search tenor.com with its own search (published OpenSearch description) and read the results page as title, text and links. One first-party HTTP request, no browser.

- `query` (string, required) — query — what to search for on tenor.com

```json
{"query":"happy"}
```

### `tenor_com__read_page` — Open a GIF detail page

Open a GIF detail page.

- `path` (string, required) — A page on tenor.com: a path like /about, or a full URL on tenor.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on tenor.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on tenor.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on tenor.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off tenor.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills tenor.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/tenor.com/call/tenor_com__get_search_suggestions \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/tenor.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
