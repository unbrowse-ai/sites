---
name: dropmms
description: "Dropmms (dropmms.com) for agents: Search dropmms.com; Read a page on dropmms.com — through Unbrowse's scoped MCP for dropmms.com (unofficial), which replays dropmms.com's own first-party API (no browser, verified results). Use when the user wants anything from dropmms.com, e.g. search dropmms.com."
---

# Unbrowse for Dropmms (dropmms.com)

Dropmms as tools for your agent. Unofficial: not affiliated with or endorsed by dropmms.com. Unbrowse compiled these from dropmms.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no dropmms.com API key.

## Connect the dropmms.com MCP

This server is a tool scope holding only dropmms.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on dropmms.com.

```sh
claude mcp add --transport http dropmms https://unbrowse.ai/mcp/dropmms.com
codex mcp add dropmms --url https://unbrowse.ai/mcp/dropmms.com && codex mcp login dropmms
```

```json
{"mcpServers":{"dropmms":{"url":"https://unbrowse.ai/mcp/dropmms.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch dropmms.com some other way and present it as this skill's result.

## Tools

### `dropmms_com__get_search` — Search dropmms.com

Read search on dropmms.com on DropMMS Forum: Download Exclusive desi original videos, photos without watermark on our forum site (dropmms.com). Use for requests like “search dropmms.com for profile”; “search dropmms.com for videos”; “search dropmms.com for videos — Search dropmms.com for videos”. Learned from 2 browser traces; chains get_search. Inputs: query e.g. "profile". Returns the page's title, readable text and links. Read-only on dropmms.com.

- `query` (string, required) — query (typed during “fill Search”), e.g. "profile", "videos"
- `quick` (integer) — optional, e.g. "1"
- `type` (string) — optional, e.g. "forums_topic"

```json
{"query":"profile"}
```

### `dropmms_com__read_page` — Read a page on dropmms.com

Read any page on dropmms.com — a path such as /news/2026/some-story, or a full dropmms.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on dropmms.com.

- `path` (string, required) — A page on dropmms.com: a path like /about, or a full URL on dropmms.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on dropmms.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on dropmms.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on dropmms.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off dropmms.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills dropmms.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/dropmms.com/call/dropmms_com__get_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"profile"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/dropmms.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
