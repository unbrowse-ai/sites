---
name: arivumani
description: "Arivumani (arivumani.net) for agents: Search arivumani.net; Read a page on arivumani.net — through Unbrowse's scoped MCP for arivumani.net (unofficial), which replays arivumani.net's own first-party API (no browser, verified results). Use when the user wants anything from arivumani.net, e.g. search arivumani.net."
---

# Unbrowse for Arivumani (arivumani.net)

Arivumani as tools for your agent. Unofficial: not affiliated with or endorsed by arivumani.net. Unbrowse compiled these from arivumani.net's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no arivumani.net API key.

## Connect the arivumani.net MCP

This server is a tool scope holding only arivumani.net: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on arivumani.net.

```sh
claude mcp add --transport http arivumani https://unbrowse.ai/mcp/arivumani.net
codex mcp add arivumani --url https://unbrowse.ai/mcp/arivumani.net && codex mcp login arivumani
```

```json
{"mcpServers":{"arivumani":{"url":"https://unbrowse.ai/mcp/arivumani.net"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch arivumani.net some other way and present it as this skill's result.

## Tools

### `arivumani_net__get_search` — Search arivumani.net

Search arivumani.net with its own search (homepage search form) and read the results page as title, text and links. One first-party HTTP request, no browser.

- `query` (string, required) — query — what to search for on arivumani.net

```json
{"query":"tamil"}
```

### `arivumani_net__read_page` — Read a page on arivumani.net

Read any page on arivumani.net — a path such as /news/2026/some-story, or a full arivumani.net URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on arivumani.net: a path like /about, or a full URL on arivumani.net

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on arivumani.net in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on arivumani.net), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on arivumani.net → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off arivumani.net is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills arivumani.net's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/arivumani.net/call/arivumani_net__get_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"tamil"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/arivumani.net/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
