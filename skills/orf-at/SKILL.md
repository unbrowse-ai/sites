---
name: orf-at
description: "Orf (orf.at) for agents: Read latest news on orf.at; Browse Austria weather forecasts; Read a page on orf.at — through Unbrowse's scoped MCP for orf.at (unofficial), which replays orf.at's own first-party API (no browser, verified results). Use when the user wants anything from orf.at, e.g. read latest news on orf.at."
---

# Unbrowse for Orf (orf.at)

Orf as tools for your agent. Unofficial: not affiliated with or endorsed by orf.at. Unbrowse compiled these from orf.at's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no orf.at API key.

## Connect the orf.at MCP

This server is a tool scope holding only orf.at: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on orf.at.

```sh
claude mcp add --transport http orf-at https://unbrowse.ai/mcp/orf.at
codex mcp add orf-at --url https://unbrowse.ai/mcp/orf.at && codex mcp login orf-at
```

```json
{"mcpServers":{"orf-at":{"url":"https://unbrowse.ai/mcp/orf.at"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch orf.at some other way and present it as this skill's result.

## Tools

### `orf_at__get_nsr_get_front_page_video` — Read latest news on orf.at

Read latest news on orf.at. No inputs. Returns data. Read-only on orf.at.

- `website` (string) — optional, e.g. "news-videos"

```json
{"website":"news-videos"}
```

### `wetter_orf_at__get_vod_wetter_json` — Browse Austria weather forecasts

Browse Austria weather forecasts. No inputs. Returns data. Read-only on wetter.orf.at.

- none

```json
{}
```

### `orf_at__read_page` — Read a page on orf.at

Read any page on orf.at — a path such as /news/2026/some-story, or a full orf.at URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on orf.at.

- `path` (string, required) — A page on orf.at: a path like /about, or a full URL on orf.at

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on orf.at in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on orf.at), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on orf.at → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off orf.at is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills orf.at's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/orf.at/call/orf_at__get_nsr_get_front_page_video \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"website":"news-videos"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/orf.at/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
