---
name: abebooks
description: "Abebooks (abebooks.com) for agents: Search abebooks.com; Search books on AbeBooks; Read a page on abebooks.com — through Unbrowse's scoped MCP for abebooks.com (unofficial), which replays abebooks.com's own first-party API (no browser, verified results). Use when the user wants anything from abebooks.com, e.g. search abebooks.com."
---

# Unbrowse for Abebooks (abebooks.com)

Abebooks as tools for your agent. Unofficial: not affiliated with or endorsed by abebooks.com. Unbrowse compiled these from abebooks.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no abebooks.com API key.

## Connect the abebooks.com MCP

This server is a tool scope holding only abebooks.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on abebooks.com.

```sh
claude mcp add --transport http abebooks https://unbrowse.ai/mcp/abebooks.com
codex mcp add abebooks --url https://unbrowse.ai/mcp/abebooks.com && codex mcp login abebooks
```

```json
{"mcpServers":{"abebooks":{"url":"https://unbrowse.ai/mcp/abebooks.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch abebooks.com some other way and present it as this skill's result.

## Tools

### `abebooks_com__get_servlet_highlight_inventory` — Search abebooks.com

Read servlet highlight inventory on www.abebooks.com on AbeBooks | Shop for Books, Art &amp; Collectibles (www.abebooks.com) in one call. Recorded for: “search www.abebooks.com for curated”; “search www.abebooks.com for curated — Search abebooks.com for curated”. Learned from 1 browser trace; chains load_root → get_servlet_highlight_inventory.

- `query` (string, required) — query (typed during “fill Enter keyword title, author, or ISBN”), e.g. "curated"

```json
{"query":"books"}
```

### `abebooks_com__get_servlet_search_results` — Search books on AbeBooks

Search books on AbeBooks.

- `Enter keyword title, author, or ISBN` (string, required) — Enter keyword title, author, or ISBN (typed during “fill Enter keyword title, author, or ISBN”)
- `sts` (string) — optional, e.g. "t"
- `searchprefs` (string) — optional, e.g. "on"

```json
{"Enter keyword title, author, or ISBN":"<Enter keyword title, author, or ISBN>"}
```

### `abebooks_com__read_page` — Read a page on abebooks.com

Read any page on abebooks.com — a path such as /news/2026/some-story, or a full abebooks.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on abebooks.com: a path like /about, or a full URL on abebooks.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on abebooks.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on abebooks.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on abebooks.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off abebooks.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills abebooks.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/abebooks.com/call/abebooks_com__get_servlet_highlight_inventory \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"books"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/abebooks.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
