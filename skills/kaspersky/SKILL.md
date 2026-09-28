---
name: kaspersky
description: "Kaspersky (kaspersky.com) for agents: Search kaspersky.com; Read a page on kaspersky.com — through Unbrowse's scoped MCP for kaspersky.com (unofficial), which replays kaspersky.com's own first-party API (no browser, verified results). Use when the user wants anything from kaspersky.com, e.g. search kaspersky.com."
---

# Unbrowse for Kaspersky (kaspersky.com)

Kaspersky as tools for your agent. Unofficial: not affiliated with or endorsed by kaspersky.com. Unbrowse compiled these from kaspersky.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no kaspersky.com API key.

## Connect the kaspersky.com MCP

This server is a tool scope holding only kaspersky.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on kaspersky.com.

```sh
claude mcp add --transport http kaspersky https://unbrowse.ai/mcp/kaspersky.com
codex mcp add kaspersky --url https://unbrowse.ai/mcp/kaspersky.com && codex mcp login kaspersky
```

```json
{"mcpServers":{"kaspersky":{"url":"https://unbrowse.ai/mcp/kaspersky.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch kaspersky.com some other way and present it as this skill's result.

## Tools

### `kaspersky_com__get_search_search` — Search kaspersky.com

Read search search on www.kaspersky.com on Kaspersky Cyber Security Solutions for Home and Business | Kaspersky (www.kaspersky.com) in one call. Recorded for: “search www.kaspersky.com for find”; “search www.kaspersky.com for premium”; “search www.kaspersky.com for premium — Search kaspersky.com for premium”. Learned from 2 browser traces; chains get_search_search.

- `query` (string, required) — query (typed during “fill Find what you need”), e.g. "find", "premium"

```json
{"query":"find"}
```

### `kaspersky_com__read_page` — Read a page on kaspersky.com

Read any page on kaspersky.com — a path such as /news/2026/some-story, or a full kaspersky.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on kaspersky.com: a path like /about, or a full URL on kaspersky.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on kaspersky.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on kaspersky.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on kaspersky.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off kaspersky.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills kaspersky.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/kaspersky.com/call/kaspersky_com__get_search_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"find"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/kaspersky.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
