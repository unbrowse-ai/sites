---
name: hoekee-com-sg
description: "Hoekee (hoekee.com.sg) for agents: Search hoekee.com.sg; Read a page on hoekee.com.sg — through Unbrowse's scoped MCP for hoekee.com.sg (unofficial), which replays hoekee.com.sg's own first-party API (no browser, verified results). Use when the user wants anything from hoekee.com.sg, e.g. search hoekee.com.sg."
---

# Unbrowse for Hoekee (hoekee.com.sg)

Hoekee as tools for your agent. Unofficial: not affiliated with or endorsed by hoekee.com.sg. Unbrowse compiled these from hoekee.com.sg's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no hoekee.com.sg API key.

## Connect the hoekee.com.sg MCP

This server is a tool scope holding only hoekee.com.sg: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on hoekee.com.sg.

```sh
claude mcp add --transport http hoekee-com-sg https://unbrowse.ai/mcp/hoekee.com.sg
codex mcp add hoekee-com-sg --url https://unbrowse.ai/mcp/hoekee.com.sg && codex mcp login hoekee-com-sg
```

```json
{"mcpServers":{"hoekee-com-sg":{"url":"https://unbrowse.ai/mcp/hoekee.com.sg"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch hoekee.com.sg some other way and present it as this skill's result.

## Tools

### `hoekee_com_sg__get_search` — Search hoekee.com.sg

Search hoekee.com.sg with its own search (homepage search form) and read the results page as title, text and links. One first-party HTTP request, no browser. Inputs: query. Returns the page's title, readable text and links. Read-only on hoekee.com.sg.

- `query` (string, required) — query — what to search for on hoekee.com.sg

```json
{"query":"krisroz"}
```

### `hoekee_com_sg__read_page` — Read a page on hoekee.com.sg

Read any page on hoekee.com.sg — a path such as /news/2026/some-story, or a full hoekee.com.sg URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on hoekee.com.sg.

- `path` (string, required) — A page on hoekee.com.sg: a path like /about, or a full URL on hoekee.com.sg

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on hoekee.com.sg in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on hoekee.com.sg), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on hoekee.com.sg → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off hoekee.com.sg is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills hoekee.com.sg's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/hoekee.com.sg/call/hoekee_com_sg__get_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"krisroz"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/hoekee.com.sg/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
