---
name: hotmart
description: "Hotmart (hotmart.com) for agents: Browse products by category on Hotmart marketplace; Search products on Hotmart marketplace; Read a page on hotmart.com — through Unbrowse's scoped MCP for hotmart.com (unofficial), which replays hotmart.com's own first-party API (no browser, verified results). Use when the user wants anything from hotmart.com, e.g. browse products by category on hotmart marketplace."
---

# Unbrowse for Hotmart (hotmart.com)

Hotmart as tools for your agent. Unofficial: not affiliated with or endorsed by hotmart.com. Unbrowse compiled these from hotmart.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no hotmart.com API key.

## Connect the hotmart.com MCP

This server is a tool scope holding only hotmart.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on hotmart.com.

```sh
claude mcp add --transport http hotmart https://unbrowse.ai/mcp/hotmart.com
codex mcp add hotmart --url https://unbrowse.ai/mcp/hotmart.com && codex mcp login hotmart
```

```json
{"mcpServers":{"hotmart":{"url":"https://unbrowse.ai/mcp/hotmart.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch hotmart.com some other way and present it as this skill's result.

## Tools

### `hotmart_com__get_product_groupby` — Browse products by category on Hotmart marketplace

Browse products by category on Hotmart marketplace.

- `categories` (string) — optional, e.g. "education,personal_development,business_and_careers,health_and_sports,gastronomy,finance"
- `searchText` (string) — optional, e.g. ""
- `size` (integer) — optional, e.g. "8"
- `field` (string) — optional, e.g. "category"
- 1 more of the site's own parameters (locale, paging and the like), sent as recorded

```json
{"categories":"education,personal_development,business_and_careers,health_and_sports,gastronomy,finance","searchText":"","size":8,"field":"category"}
```

### `hotmart_com__get_canva_pack_marketing_digital_7_b4_7_d` — Search products on Hotmart marketplace

Search products on Hotmart marketplace.

- `en` (string)
- `marketplace` (string)
- `query` (string, required) — query (typed during “fill Try searching for ”marketing” or ”cooking””)
- `initialSelectedCategory` (string) — optional, e.g. ""
- `sck` (string) — optional, e.g. "HOTMART_SITE"
- `hotfeature` (integer) — optional, e.g. "33"

```json
{"query":"<query>"}
```

### `hotmart_com__read_page` — Read a page on hotmart.com

Read any page on hotmart.com — a path such as /news/2026/some-story, or a full hotmart.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on hotmart.com: a path like /about, or a full URL on hotmart.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on hotmart.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on hotmart.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on hotmart.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off hotmart.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills hotmart.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/hotmart.com/call/hotmart_com__get_product_groupby \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"categories":"education,personal_development,business_and_careers,health_and_sports,gastronomy,finance","searchText":"","size":8,"field":"category"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/hotmart.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
