---
name: respawn
description: "Respawn (respawn.com) for agents: List games; List news; Browse games — through Unbrowse's scoped MCP for respawn.com (unofficial), which replays respawn.com's own first-party API (no browser, verified results). Use when the user wants anything from respawn.com, e.g. list games."
---

# Unbrowse for Respawn (respawn.com)

Respawn as tools for your agent. Unofficial: not affiliated with or endorsed by respawn.com. Unbrowse compiled these from respawn.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no respawn.com API key.

## Connect the respawn.com MCP

This server is a tool scope holding only respawn.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on respawn.com.

```sh
claude mcp add --transport http respawn https://unbrowse.ai/mcp/respawn.com
codex mcp add respawn --url https://unbrowse.ai/mcp/respawn.com && codex mcp login respawn
```

```json
{"mcpServers":{"respawn":{"url":"https://unbrowse.ai/mcp/respawn.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch respawn.com some other way and present it as this skill's result.

## Tools

### `respawn_com__get_data_games` — List games

List games. No inputs. Returns games. Read-only on respawn.com.

- none

```json
{}
```

### `respawn_com__get_data_news` — List news

List news. No inputs. Returns news. Read-only on respawn.com.

- none

```json
{}
```

### `respawn_com__get_data_careers` — Browse games

Browse games. No inputs. Returns title, subtitle, studioImage, introText, outroText, video, perks, categories. Read-only on respawn.com.

- none

```json
{}
```

Always there too: `unbrowse.run` (a task on respawn.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on respawn.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on respawn.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off respawn.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills respawn.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/respawn.com/call/respawn_com__get_data_games \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/respawn.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
