---
name: playgama
description: "Playgama (playgama.com) for agents: Search playgama.com; Read a page on playgama.com — through Unbrowse's scoped MCP for playgama.com (unofficial), which replays playgama.com's own first-party API (no browser, verified results). Use when the user wants anything from playgama.com, e.g. search playgama.com."
---

# Unbrowse for Playgama (playgama.com)

Playgama as tools for your agent. Unofficial: not affiliated with or endorsed by playgama.com. Unbrowse compiled these from playgama.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no playgama.com API key.

## Connect the playgama.com MCP

This server is a tool scope holding only playgama.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on playgama.com.

```sh
claude mcp add --transport http playgama https://unbrowse.ai/mcp/playgama.com
codex mcp add playgama --url https://unbrowse.ai/mcp/playgama.com && codex mcp login playgama
```

```json
{"mcpServers":{"playgama":{"url":"https://unbrowse.ai/mcp/playgama.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch playgama.com some other way and present it as this skill's result.

## Tools

### `playgama_com__get_search` — Search playgama.com

Search playgama.com with its own search (published OpenSearch description) and read the results page as title, text and links. One first-party HTTP request, no browser.

- `query` (string, required) — query — what to search for on playgama.com

```json
{"query":"merge"}
```

### `playgama_com__read_page` — Read a page on playgama.com

Read any page on playgama.com — a path such as /news/2026/some-story, or a full playgama.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on playgama.com: a path like /about, or a full URL on playgama.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on playgama.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on playgama.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on playgama.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off playgama.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills playgama.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/playgama.com/call/playgama_com__get_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"merge"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/playgama.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
