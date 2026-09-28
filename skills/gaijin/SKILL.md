---
name: gaijin
description: "Gaijin (gaijin.net) for agents: Open a product details page on Gaijin.Net Store; Search products on Gaijin.Net Store; Browse store category by game on Gaijin.Net Store; Read a page on gaijin.net — through Unbrowse's scoped MCP for gaijin.net (unofficial), which replays gaijin.net's own first-party API (no browser, verified results). Use when the user wants anything from gaijin.net, e.g. open a product details page on gaijin.net store."
---

# Unbrowse for Gaijin (gaijin.net)

Gaijin as tools for your agent. Unofficial: not affiliated with or endorsed by gaijin.net. Unbrowse compiled these from gaijin.net's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no gaijin.net API key.

## Connect the gaijin.net MCP

This server is a tool scope holding only gaijin.net: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on gaijin.net.

```sh
claude mcp add --transport http gaijin https://unbrowse.ai/mcp/gaijin.net
codex mcp add gaijin --url https://unbrowse.ai/mcp/gaijin.net && codex mcp login gaijin
```

```json
{"mcpServers":{"gaijin":{"url":"https://unbrowse.ai/mcp/gaijin.net"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch gaijin.net some other way and present it as this skill's result.

## Tools

### `store_gaijin_net__get_story_php` — Open a product details page on Gaijin.Net Store

Open a product details page on Gaijin.Net Store.

- `title` (string) — optional, e.g. "10000-Golden-Eagles"
- `ppupPurchaseItemId` (integer) — optional, e.g. "3748"

```json
{"title":"10000-Golden-Eagles","ppupPurchaseItemId":3748}
```

### `store_gaijin_net__get_search_php` — Search products on Gaijin.Net Store

Search products on Gaijin.Net Store.

- `query` (string, required) — query (typed during “fill e13”)

```json
{"query":"<query>"}
```

### `store_gaijin_net__get_storefront_php` — Browse store category by game on Gaijin.Net Store

Browse store category by game on Gaijin.Net Store.

- `category` (string) — optional, e.g. "WarThunder"

```json
{"category":"WarThunder"}
```

### `gaijin_net__read_page` — Read a page on gaijin.net

Read a page on gaijin.net.

- `path` (string, required) — A page on gaijin.net: a path like /about, or a full URL on gaijin.net

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on gaijin.net in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on gaijin.net), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on gaijin.net → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off gaijin.net is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills gaijin.net's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/store.gaijin.net/call/store_gaijin_net__get_story_php \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"title":"10000-Golden-Eagles","ppupPurchaseItemId":3748}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/store.gaijin.net/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
