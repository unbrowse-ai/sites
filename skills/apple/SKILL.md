---
name: apple
description: "Apple (apple.com) for agents: Search apple.com; Browse an Apple product category; Read a page on apple.com — through Unbrowse's scoped MCP for apple.com (unofficial), which replays apple.com's own first-party API (no browser, verified results). Use when the user wants anything from apple.com, e.g. search apple.com."
---

# Unbrowse for Apple (apple.com)

Apple as tools for your agent. Unofficial: not affiliated with or endorsed by apple.com. Unbrowse compiled these from apple.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no apple.com API key.

## Connect the apple.com MCP

This server is a tool scope holding only apple.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on apple.com.

```sh
claude mcp add --transport http apple https://unbrowse.ai/mcp/apple.com
codex mcp add apple --url https://unbrowse.ai/mcp/apple.com && codex mcp login apple
```

```json
{"mcpServers":{"apple":{"url":"https://unbrowse.ai/mcp/apple.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch apple.com some other way and present it as this skill's result.

## Tools

### `apple_com__render_page` — Search apple.com

Search apple.com. Inputs: query. Returns the page's title, readable text and links. Read-only on apple.com.

- `query` (string, required) — query — what to search for on apple.com

```json
{"query":"<query>"}
```

### `apple_com__get_mcm_product_price` — Browse an Apple product category

Browse an Apple product category. No inputs. Returns items. Read-only on apple.com.

- `parts` (string) — optional, e.g. "IPAD2025_MAIN,IPADAIR2026_MAIN,IPADMINI2024_MAIN,IPADPRO11_WI_2025"

```json
{"parts":"IPAD2025_MAIN,IPADAIR2026_MAIN,IPADMINI2024_MAIN,IPADPRO11_WI_2025"}
```

### `apple_com__read_page` — Read a page on apple.com

Read any page on apple.com — a path such as /news/2026/some-story, or a full apple.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on apple.com.

- `path` (string, required) — A page on apple.com: a path like /about, or a full URL on apple.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on apple.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on apple.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on apple.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off apple.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills apple.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/apple.com/call/apple_com__render_page \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/apple.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
