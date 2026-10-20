---
name: konnectbot
description: "Konnectbot (konnectbot.com) for agents: Search the documentation; Browse blog posts by page; View the system status page: list current service status and any incident histor — through Unbrowse's scoped MCP for konnectbot.com (unofficial), which replays konnectbot.com's own first-party API (no browser, verified results). Use when the user wants anything from konnectbot.com, e.g. search the documentation."
---

# Unbrowse for Konnectbot (konnectbot.com)

Konnectbot as tools for your agent. Unofficial: not affiliated with or endorsed by konnectbot.com. Unbrowse compiled these from konnectbot.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no konnectbot.com API key.

## Connect the konnectbot.com MCP

This server is a tool scope holding only konnectbot.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on konnectbot.com.

```sh
claude mcp add --transport http konnectbot https://unbrowse.ai/mcp/konnectbot.com
codex mcp add konnectbot --url https://unbrowse.ai/mcp/konnectbot.com && codex mcp login konnectbot
```

```json
{"mcpServers":{"konnectbot":{"url":"https://unbrowse.ai/mcp/konnectbot.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch konnectbot.com some other way and present it as this skill's result.

## Tools

### `docs_konnectbot_com__post_anonymous` — Search the documentation

Search the documentation. Inputs: query. Returns results. Read-only on docs.konnectbot.com.

- `query` (string, required) — query (typed during “fill Search...”)
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"query":"<query>"}
```

### `konnectbot_com__get_blogs` — Browse blog posts by page

Browse blog posts by page. Inputs: p. Returns the page's title, readable text and links. Read-only on konnectbot.com.

- `p` (integer, required)
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"p":"<p>"}
```

### `konnectbot_com__read_page` — View the system status page: list current service status and any incident histor

View the system status page: list current service status and any incident histor. Inputs: name. Returns the page's title, readable text and links. Read-only on konnectbot.com.

- `name` (string, required)
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"name":"<name>"}
```

Always there too: `unbrowse_run` (a task on konnectbot.com in plain words), `unbrowse_inspect`, `unbrowse_resume`, `unbrowse_scrape` and `unbrowse_map` (any page on konnectbot.com), and the recorded cloud browser `unbrowse_browse_open` → `unbrowse_browse_act` → `unbrowse_browse_finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse_resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse_run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse_browse_open` on konnectbot.com → `unbrowse_browse_act` → `unbrowse_browse_finish`, which compiles a new tool this server lists next time. Anything off konnectbot.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse_browse_act` with `action: "autofill"` fills konnectbot.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/docs.konnectbot.com/call/docs_konnectbot_com__post_anonymous \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/docs.konnectbot.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
