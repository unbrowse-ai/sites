---
name: epfl-ch
description: "Epfl (epfl.ch) for agents: Search the EPFL website; Read a page on epfl.ch — through Unbrowse's scoped MCP for epfl.ch (unofficial), which replays epfl.ch's own first-party API (no browser, verified results). Use when the user wants anything from epfl.ch, e.g. search the epfl website."
---

# Unbrowse for Epfl (epfl.ch)

Epfl as tools for your agent. Unofficial: not affiliated with or endorsed by epfl.ch. Unbrowse compiled these from epfl.ch's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no epfl.ch API key.

## Connect the epfl.ch MCP

This server is a tool scope holding only epfl.ch: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on epfl.ch.

```sh
claude mcp add --transport http epfl-ch https://unbrowse.ai/mcp/epfl.ch
codex mcp add epfl-ch --url https://unbrowse.ai/mcp/epfl.ch && codex mcp login epfl-ch
```

```json
{"mcpServers":{"epfl-ch":{"url":"https://unbrowse.ai/mcp/epfl.ch"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch epfl.ch some other way and present it as this skill's result.

## Tools

### `epfl_ch__render_page` — Search the EPFL website

Search the EPFL website. Inputs: query. Returns the page's title, readable text and links. Read-only on epfl.ch.

- `query` (string, required) — query — what to search for on search.epfl.ch

```json
{"query":"<query>"}
```

### `epfl_ch__read_page` — Read a page on epfl.ch

Read any page on epfl.ch — a path such as /news/2026/some-story, or a full epfl.ch URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on epfl.ch.

- `path` (string, required) — A page on epfl.ch: a path like /about, or a full URL on epfl.ch

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on epfl.ch in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on epfl.ch), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on epfl.ch → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off epfl.ch is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills epfl.ch's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/epfl.ch/call/epfl_ch__render_page \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/epfl.ch/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
