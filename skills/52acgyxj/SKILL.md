---
name: 52acgyxj
description: "52acgyxj (52acgyxj.com) for agents: Search 52acgyxj.com — through Unbrowse's scoped MCP for 52acgyxj.com (unofficial), which replays 52acgyxj.com's own first-party API (no browser, verified results). Use when the user wants anything from 52acgyxj.com, e.g. search 52acgyxj.com."
---

# Unbrowse for 52acgyxj (52acgyxj.com)

52acgyxj as tools for your agent. Unofficial: not affiliated with or endorsed by 52acgyxj.com. Unbrowse compiled these from 52acgyxj.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no 52acgyxj.com API key.

## Connect the 52acgyxj.com MCP

This server is a tool scope holding only 52acgyxj.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on 52acgyxj.com.

```sh
claude mcp add --transport http 52acgyxj https://unbrowse.ai/mcp/52acgyxj.com
codex mcp add 52acgyxj --url https://unbrowse.ai/mcp/52acgyxj.com && codex mcp login 52acgyxj
```

```json
{"mcpServers":{"52acgyxj":{"url":"https://unbrowse.ai/mcp/52acgyxj.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch 52acgyxj.com some other way and present it as this skill's result.

## Tools

### `52acgyxj_com__get_search` — Search 52acgyxj.com

Search 52acgyxj.com with its own search (homepage search form) and read the results page as title, text and links. One first-party HTTP request, no browser. Inputs: query. Returns the page's title, readable text and links. Read-only on 52acgyxj.com.

- `query` (string, required) — query — what to search for on 52acgyxj.com

```json
{"query":"acg游戏姬"}
```

Always there too: `unbrowse.run` (a task on 52acgyxj.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on 52acgyxj.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on 52acgyxj.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off 52acgyxj.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills 52acgyxj.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/52acgyxj.com/call/52acgyxj_com__get_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"acg游戏姬"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/52acgyxj.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
