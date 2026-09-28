---
name: wordunscrambler-me
description: "Wordunscrambler (wordunscrambler.me) for agents: Search wordunscrambler.me; Read a page on wordunscrambler.me — through Unbrowse's scoped MCP for wordunscrambler.me (unofficial), which replays wordunscrambler.me's own first-party API (no browser, verified results). Use when the user wants anything from wordunscrambler.me, e.g. search wordunscrambler.me."
---

# Unbrowse for Wordunscrambler (wordunscrambler.me)

Wordunscrambler as tools for your agent. Unofficial: not affiliated with or endorsed by wordunscrambler.me. Unbrowse compiled these from wordunscrambler.me's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no wordunscrambler.me API key.

## Connect the wordunscrambler.me MCP

This server is a tool scope holding only wordunscrambler.me: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on wordunscrambler.me.

```sh
claude mcp add --transport http wordunscrambler-me https://unbrowse.ai/mcp/wordunscrambler.me
codex mcp add wordunscrambler-me --url https://unbrowse.ai/mcp/wordunscrambler.me && codex mcp login wordunscrambler-me
```

```json
{"mcpServers":{"wordunscrambler-me":{"url":"https://unbrowse.ai/mcp/wordunscrambler.me"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch wordunscrambler.me some other way and present it as this skill's result.

## Tools

### `wordunscrambler_me__render_page` — Search wordunscrambler.me

Search wordunscrambler.me and read the results page (/unscramble/solver). The site builds its results in the browser, so each run renders the page (Unbrowse's own browser, then a hosted renderer when the site blocks it) instead of calling an API: seconds, not milliseconds. Use for requests like “search wordunscrambler.me for solver — Search wordunscrambler.me for solver”. Inputs: query e.g. "solver". Returns the page's title, readable text and links. Read-only on wordunscrambler.me.

- `query` (string, required) — query — what to search for on wordunscrambler.me

```json
{"query":"word"}
```

### `wordunscrambler_me__read_page` — Read a page on wordunscrambler.me

Read any page on wordunscrambler.me — a path such as /news/2026/some-story, or a full wordunscrambler.me URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on wordunscrambler.me.

- `path` (string, required) — A page on wordunscrambler.me: a path like /about, or a full URL on wordunscrambler.me

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on wordunscrambler.me in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on wordunscrambler.me), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on wordunscrambler.me → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off wordunscrambler.me is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills wordunscrambler.me's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/wordunscrambler.me/call/wordunscrambler_me__render_page \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"word"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/wordunscrambler.me/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
