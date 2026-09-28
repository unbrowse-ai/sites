---
name: fortinet
description: "Fortinet (fortinet.com) for agents: Search the Fortinet site; Read a fortinet.com page by name — through Unbrowse's scoped MCP for fortinet.com (unofficial), which replays fortinet.com's own first-party API (no browser, verified results). Use when the user wants anything from fortinet.com, e.g. search the fortinet site."
---

# Unbrowse for Fortinet (fortinet.com)

Fortinet as tools for your agent. Unofficial: not affiliated with or endorsed by fortinet.com. Unbrowse compiled these from fortinet.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no fortinet.com API key.

## Connect the fortinet.com MCP

This server is a tool scope holding only fortinet.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on fortinet.com.

```sh
claude mcp add --transport http fortinet https://unbrowse.ai/mcp/fortinet.com
codex mcp add fortinet --url https://unbrowse.ai/mcp/fortinet.com && codex mcp login fortinet
```

```json
{"mcpServers":{"fortinet":{"url":"https://unbrowse.ai/mcp/fortinet.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch fortinet.com some other way and present it as this skill's result.

## Tools

### `fortinet_com__render_page` — Search the Fortinet site

Search the Fortinet site.

- `query` (string, required) — query — what to search for on fortinet.com

```json
{"query":"<query>"}
```

### `fortinet_com__read_page` — Read a fortinet.com page by name

Read a fortinet.com page by name.

- `name` (string, required)

```json
{"name":"<name>"}
```

Always there too: `unbrowse.run` (a task on fortinet.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on fortinet.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on fortinet.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off fortinet.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills fortinet.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/fortinet.com/call/fortinet_com__render_page \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/fortinet.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
