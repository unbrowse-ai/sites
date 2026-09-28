---
name: fastly
description: "Fastly (fastly.com) for agents: Search fastly.net; Read a page on fastly.com — through Unbrowse's scoped MCP for fastly.com (unofficial), which replays fastly.com's own first-party API (no browser, verified results). Use when the user wants anything from fastly.com, e.g. search fastly.net."
---

# Unbrowse for Fastly (fastly.com)

Fastly as tools for your agent. Unofficial: not affiliated with or endorsed by fastly.com. Unbrowse compiled these from fastly.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no fastly.com API key.

## Connect the fastly.com MCP

This server is a tool scope holding only fastly.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on fastly.com.

```sh
claude mcp add --transport http fastly https://unbrowse.ai/mcp/fastly.com
codex mcp add fastly --url https://unbrowse.ai/mcp/fastly.com && codex mcp login fastly
```

```json
{"mcpServers":{"fastly":{"url":"https://unbrowse.ai/mcp/fastly.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch fastly.com some other way and present it as this skill's result.

## Tools

### `fastly_com__get_public_search_marketing` — Search fastly.net

Read public search marketing on www.fastly.com on Powering the best of the internet | Fastly (www.fastly.com) in one call. Recorded for: “search www.fastly.com for customer”; “search www.fastly.com for story”; “search www.fastly.com for story — Search fastly.net for story”. Learned from 2 browser traces; chains get_public_search_marketing.

- `query` (string, required) — query (typed during “fill Search”), e.g. "customer", "story"

```json
{"query":"customer"}
```

### `fastly_com__read_page` — Read a page on fastly.com

Read any page on fastly.com — a path such as /news/2026/some-story, or a full fastly.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on fastly.com: a path like /about, or a full URL on fastly.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on fastly.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on fastly.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on fastly.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off fastly.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills fastly.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/fastly.com/call/fastly_com__get_public_search_marketing \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"customer"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/fastly.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
