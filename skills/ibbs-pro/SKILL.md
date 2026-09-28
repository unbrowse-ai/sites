---
name: ibbs-pro
description: "Ibbs (ibbs.pro) for agents: Search ibbs.pro; Read a page on ibbs.pro — through Unbrowse's scoped MCP for ibbs.pro (unofficial), which replays ibbs.pro's own first-party API (no browser, verified results). Use when the user wants anything from ibbs.pro, e.g. search ibbs.pro."
---

# Unbrowse for Ibbs (ibbs.pro)

Ibbs as tools for your agent. Unofficial: not affiliated with or endorsed by ibbs.pro. Unbrowse compiled these from ibbs.pro's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no ibbs.pro API key.

## Connect the ibbs.pro MCP

This server is a tool scope holding only ibbs.pro: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on ibbs.pro.

```sh
claude mcp add --transport http ibbs-pro https://unbrowse.ai/mcp/ibbs.pro
codex mcp add ibbs-pro --url https://unbrowse.ai/mcp/ibbs.pro && codex mcp login ibbs-pro
```

```json
{"mcpServers":{"ibbs-pro":{"url":"https://unbrowse.ai/mcp/ibbs.pro"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch ibbs.pro some other way and present it as this skill's result.

## Tools

### `ibbs_pro__get_search` — Search ibbs.pro

Search ibbs.pro with its own search (homepage search form) and read the results page as title, text and links. One first-party HTTP request, no browser. Inputs: query. Returns the page's title, readable text and links. Read-only on ibbs.pro.

- `query` (string, required) — query — what to search for on ibbs.pro

```json
{"query":"在线视频"}
```

### `ibbs_pro__read_page` — Read a page on ibbs.pro

Read any page on ibbs.pro — a path such as /news/2026/some-story, or a full ibbs.pro URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on ibbs.pro.

- `path` (string, required) — A page on ibbs.pro: a path like /about, or a full URL on ibbs.pro

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on ibbs.pro in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on ibbs.pro), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on ibbs.pro → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off ibbs.pro is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills ibbs.pro's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/ibbs.pro/call/ibbs_pro__get_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"在线视频"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/ibbs.pro/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
