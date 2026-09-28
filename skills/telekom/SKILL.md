---
name: telekom
description: "Telekom (telekom.com) for agents: Search telekom.net; Read a page on telekom.com — through Unbrowse's scoped MCP for telekom.com (unofficial), which replays telekom.com's own first-party API (no browser, verified results). Use when the user wants anything from telekom.com, e.g. search telekom.net."
---

# Unbrowse for Telekom (telekom.com)

Telekom as tools for your agent. Unofficial: not affiliated with or endorsed by telekom.com. Unbrowse compiled these from telekom.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no telekom.com API key.

## Connect the telekom.com MCP

This server is a tool scope holding only telekom.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on telekom.com.

```sh
claude mcp add --transport http telekom https://unbrowse.ai/mcp/telekom.com
codex mcp add telekom --url https://unbrowse.ai/mcp/telekom.com && codex mcp login telekom
```

```json
{"mcpServers":{"telekom":{"url":"https://unbrowse.ai/mcp/telekom.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch telekom.com some other way and present it as this skill's result.

## Tools

### `telekom_com__get_en_search_search_json` — Search telekom.net

Read en search search json on www.telekom.com on Home | Deutsche Telekom (www.telekom.com) in one call. Recorded for: “search www.telekom.com for customer”; “search www.telekom.com for deutsche”; “search www.telekom.com for deutsche — Search telekom.net for deutsche”. Learned from 2 browser traces; chains get_csrf_token_json → get_en_search_search_json.

- `query` (string, required) — query (typed during “fill Search”), e.g. "customer", "deutsche"

```json
{"query":"customer"}
```

### `telekom_com__read_page` — Read a page on telekom.com

Read any page on telekom.com — a path such as /news/2026/some-story, or a full telekom.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on telekom.com: a path like /about, or a full URL on telekom.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on telekom.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on telekom.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on telekom.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off telekom.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills telekom.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/telekom.com/call/telekom_com__get_en_search_search_json \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"customer"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/telekom.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
