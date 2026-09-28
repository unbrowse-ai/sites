---
name: malaysiakini
description: "Malaysiakini (malaysiakini.com) for agents: Search m.malaysiakini.com; Read a page on malaysiakini.com — through Unbrowse's scoped MCP for malaysiakini.com (unofficial), which replays malaysiakini.com's own first-party API (no browser, verified results). Use when the user wants anything from malaysiakini.com, e.g. search m.malaysiakini.com."
---

# Unbrowse for Malaysiakini (malaysiakini.com)

Malaysiakini as tools for your agent. Unofficial: not affiliated with or endorsed by malaysiakini.com. Unbrowse compiled these from malaysiakini.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no malaysiakini.com API key.

## Connect the malaysiakini.com MCP

This server is a tool scope holding only malaysiakini.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on malaysiakini.com.

```sh
claude mcp add --transport http malaysiakini https://unbrowse.ai/mcp/malaysiakini.com
codex mcp add malaysiakini --url https://unbrowse.ai/mcp/malaysiakini.com && codex mcp login malaysiakini
```

```json
{"mcpServers":{"malaysiakini":{"url":"https://unbrowse.ai/mcp/malaysiakini.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch malaysiakini.com some other way and present it as this skill's result.

## Tools

### `malaysiakini_com__get_en_search` — Search m.malaysiakini.com

Read en search on www.malaysiakini.com on Malaysiakini (www.malaysiakini.com) in one call. Recorded for: “search www.malaysiakini.com for najib”; “search www.malaysiakini.com for sembilan”; “search www.malaysiakini.com for sembilan — Search m.malaysiakini.com for sembilan”. Learned from 2 browser traces; chains get_me → get_en_search.

- `query` (string, required) — query (typed during “fill Search Keywords”), e.g. "najib", "sembilan"
- `category` (string) — optional, e.g. ""
- `startDate` (string) — optional, e.g. ""
- `endDate` (string) — optional, e.g. ""
- `sort` (string) — optional, e.g. "desc"

```json
{"query":"najib"}
```

### `malaysiakini_com__read_page` — Read a page on malaysiakini.com

Read any page on malaysiakini.com — a path such as /news/2026/some-story, or a full malaysiakini.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on malaysiakini.com: a path like /about, or a full URL on malaysiakini.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on malaysiakini.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on malaysiakini.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on malaysiakini.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off malaysiakini.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills malaysiakini.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/malaysiakini.com/call/malaysiakini_com__get_en_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"najib"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/malaysiakini.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
