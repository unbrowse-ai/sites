---
name: liftoff
description: "Liftoff (liftoff.ai) for agents: Search liftoff.ai; Read a page on liftoff.ai — through Unbrowse's scoped MCP for liftoff.ai (unofficial), which replays liftoff.ai's own first-party API (no browser, verified results). Use when the user wants anything from liftoff.ai, e.g. search liftoff.ai."
---

# Unbrowse for Liftoff (liftoff.ai)

Liftoff as tools for your agent. Unofficial: not affiliated with or endorsed by liftoff.ai. Unbrowse compiled these from liftoff.ai's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no liftoff.ai API key.

## Connect the liftoff.ai MCP

This server is a tool scope holding only liftoff.ai: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on liftoff.ai.

```sh
claude mcp add --transport http liftoff https://unbrowse.ai/mcp/liftoff.ai
codex mcp add liftoff --url https://unbrowse.ai/mcp/liftoff.ai && codex mcp login liftoff
```

```json
{"mcpServers":{"liftoff":{"url":"https://unbrowse.ai/mcp/liftoff.ai"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch liftoff.ai some other way and present it as this skill's result.

## Tools

### `liftoff_ai__get_search` — Search liftoff.ai

Search liftoff.ai with its own search (homepage search form) and read the results page as title, text and links. One first-party HTTP request, no browser. Inputs: query. Returns the page's title, readable text and links. Read-only on liftoff.ai.

- `query` (string, required) — query — what to search for on liftoff.ai

```json
{"query":"mobile"}
```

### `liftoff_ai__read_page` — Read a page on liftoff.ai

Read any page on liftoff.ai — a path such as /news/2026/some-story, or a full liftoff.ai URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on liftoff.ai.

- `path` (string, required) — A page on liftoff.ai: a path like /about, or a full URL on liftoff.ai

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on liftoff.ai in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on liftoff.ai), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on liftoff.ai → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off liftoff.ai is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills liftoff.ai's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/liftoff.ai/call/liftoff_ai__get_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"mobile"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/liftoff.ai/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
