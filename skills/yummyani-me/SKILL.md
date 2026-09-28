---
name: yummyani-me
description: "Yummyani (yummyani.me) for agents: Search yummyani.me; Search anime by name; Browse TOP-100 anime rankings — through Unbrowse's scoped MCP for yummyani.me (unofficial), which replays yummyani.me's own first-party API (no browser, verified results). Use when the user wants anything from yummyani.me, e.g. search yummyani.me."
---

# Unbrowse for Yummyani (yummyani.me)

Yummyani as tools for your agent. Unofficial: not affiliated with or endorsed by yummyani.me. Unbrowse compiled these from yummyani.me's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no yummyani.me API key.

## Connect the yummyani.me MCP

This server is a tool scope holding only yummyani.me: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on yummyani.me.

```sh
claude mcp add --transport http yummyani-me https://unbrowse.ai/mcp/yummyani.me
codex mcp add yummyani-me --url https://unbrowse.ai/mcp/yummyani.me && codex mcp login yummyani-me
```

```json
{"mcpServers":{"yummyani-me":{"url":"https://unbrowse.ai/mcp/yummyani.me"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch yummyani.me some other way and present it as this skill's result.

## Tools

### `old_yummyani_me__get_search_2` — Search yummyani.me

Read search 2 on old.yummyani.me on YummyAnime &mdash; Watch anime online free in high quality (old.yummyani.me) in one call. Recorded for: “search old.yummyani.me for season”; “search old.yummyani.me for anime”; “search old.yummyani.me for anime — Search yummyani.me for anime”. Learned from 2 browser traces; chains get_search_2.

- `query` (string, required) — query (typed during “fill Search anime by title”), e.g. "season", "anime"

```json
{"query":"season"}
```

### `yummyani_me__get_search_2` — Search anime by name

Search anime by name.

- `query` (string, required) — query (typed during “fill Найти аниме по названию”)

```json
{"query":"<query>"}
```

### `old_yummyani_me__read_page` — Browse TOP-100 anime rankings

Browse TOP-100 anime rankings.

- `path` (string, required) — A page on old.yummyani.me: a path like /about, or a full URL on old.yummyani.me

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on yummyani.me in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on yummyani.me), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on yummyani.me → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off yummyani.me is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills yummyani.me's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/old.yummyani.me/call/old_yummyani_me__get_search_2 \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"season"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/old.yummyani.me/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
