---
name: sinarharian-com-my
description: "Sinarharian (sinarharian.com.my) for agents: Search sinarharian.com.my; Read a page on sinarharian.com.my — through Unbrowse's scoped MCP for sinarharian.com.my (unofficial), which replays sinarharian.com.my's own first-party API (no browser, verified results). Use when the user wants anything from sinarharian.com.my, e.g. search sinarharian.com.my."
---

# Unbrowse for Sinarharian (sinarharian.com.my)

Sinarharian as tools for your agent. Unofficial: not affiliated with or endorsed by sinarharian.com.my. Unbrowse compiled these from sinarharian.com.my's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no sinarharian.com.my API key.

## Connect the sinarharian.com.my MCP

This server is a tool scope holding only sinarharian.com.my: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on sinarharian.com.my.

```sh
claude mcp add --transport http sinarharian-com-my https://unbrowse.ai/mcp/sinarharian.com.my
codex mcp add sinarharian-com-my --url https://unbrowse.ai/mcp/sinarharian.com.my && codex mcp login sinarharian-com-my
```

```json
{"mcpServers":{"sinarharian-com-my":{"url":"https://unbrowse.ai/mcp/sinarharian.com.my"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch sinarharian.com.my some other way and present it as this skill's result.

## Tools

### `sinarharian_com_my__get_search` — Search sinarharian.com.my

Search sinarharian.com.my with its own search (homepage search form) and read the results page as title, text and links. One first-party HTTP request, no browser. Inputs: query. Returns the page's title, readable text and links. Read-only on sinarharian.com.my.

- `query` (string, required) — query — what to search for on sinarharian.com.my

```json
{"query":"foto"}
```

### `sinarharian_com_my__read_page` — Read a page on sinarharian.com.my

Read any page on sinarharian.com.my — a path such as /news/2026/some-story, or a full sinarharian.com.my URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on sinarharian.com.my.

- `path` (string, required) — A page on sinarharian.com.my: a path like /about, or a full URL on sinarharian.com.my

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on sinarharian.com.my in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on sinarharian.com.my), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on sinarharian.com.my → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off sinarharian.com.my is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills sinarharian.com.my's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/sinarharian.com.my/call/sinarharian_com_my__get_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"foto"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/sinarharian.com.my/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
