---
name: oray
description: "Oray (oray.com) for agents: Browse the Oray store catalog with product prices; Read a page on oray.com — through Unbrowse's scoped MCP for oray.com (unofficial), which replays oray.com's own first-party API (no browser, verified results). Use when the user wants anything from oray.com, e.g. browse the oray store catalog with product prices."
---

# Unbrowse for Oray (oray.com)

Oray as tools for your agent. Unofficial: not affiliated with or endorsed by oray.com. Unbrowse compiled these from oray.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no oray.com API key.

## Connect the oray.com MCP

This server is a tool scope holding only oray.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on oray.com.

```sh
claude mcp add --transport http oray https://unbrowse.ai/mcp/oray.com
codex mcp add oray --url https://unbrowse.ai/mcp/oray.com && codex mcp login oray
```

```json
{"mcpServers":{"oray":{"url":"https://unbrowse.ai/mcp/oray.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch oray.com some other way and present it as this skill's result.

## Tools

### `store_oray_com__get_catalog` — Browse the Oray store catalog with product prices

Browse the Oray store catalog with product prices. Inputs: path_1. Returns data. Read-only on store.oray.com.

- `path_1` (integer, required) — path 1

```json
{"path_1":"<path_1>"}
```

### `oray_com__read_page` — Read a page on oray.com

Read any page on oray.com — a path such as /news/2026/some-story, or a full oray.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on oray.com.

- `path` (string, required) — A page on oray.com: a path like /about, or a full URL on oray.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on oray.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on oray.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on oray.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off oray.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills oray.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/store.oray.com/call/store_oray_com__get_catalog \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"path_1":"<path_1>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/store.oray.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
