---
name: flipsnack
description: "Flipsnack (flipsnack.com) for agents: Open a flipsnack template page; Search flipsnack templates; Read a page on flipsnack.com — through Unbrowse's scoped MCP for flipsnack.com (unofficial), which replays flipsnack.com's own first-party API (no browser, verified results). Use when the user wants anything from flipsnack.com, e.g. open a flipsnack template page."
---

# Unbrowse for Flipsnack (flipsnack.com)

Flipsnack as tools for your agent. Unofficial: not affiliated with or endorsed by flipsnack.com. Unbrowse compiled these from flipsnack.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no flipsnack.com API key.

## Connect the flipsnack.com MCP

This server is a tool scope holding only flipsnack.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on flipsnack.com.

```sh
claude mcp add --transport http flipsnack https://unbrowse.ai/mcp/flipsnack.com
codex mcp add flipsnack --url https://unbrowse.ai/mcp/flipsnack.com && codex mcp login flipsnack
```

```json
{"mcpServers":{"flipsnack":{"url":"https://unbrowse.ai/mcp/flipsnack.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch flipsnack.com some other way and present it as this skill's result.

## Tools

### `flipsnack_com__get_templates_related` — Open a flipsnack template page

Open a flipsnack template page. Inputs: category_ids; excluded_ids. Returns data. Read-only on flipsnack.com.

- `category_ids` (string, required) — category ids
- `excluded_ids` (integer, required) — excluded ids
- `currentPage` (integer) — optional, e.g. "1"

```json
{"category_ids":"<category_ids>","excluded_ids":"<excluded_ids>"}
```

### `flipsnack_com__get_templates_search` — Search flipsnack templates

Search flipsnack templates. Inputs: q. Returns the page's title, readable text and links. Read-only on flipsnack.com.

- `q` (string, required)

```json
{"q":"<q>"}
```

### `flipsnack_com__read_page` — Read a page on flipsnack.com

Read any page on flipsnack.com — a path such as /news/2026/some-story, or a full flipsnack.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on flipsnack.com.

- `path` (string, required) — A page on flipsnack.com: a path like /about, or a full URL on flipsnack.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on flipsnack.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on flipsnack.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on flipsnack.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off flipsnack.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills flipsnack.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/flipsnack.com/call/flipsnack_com__get_templates_related \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"category_ids":"<category_ids>","excluded_ids":"<excluded_ids>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/flipsnack.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
