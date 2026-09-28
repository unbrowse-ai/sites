---
name: swr-de
description: "Swr (swr.de) for agents: Open a SWR news article page; Read a page on swr.de — through Unbrowse's scoped MCP for swr.de (unofficial), which replays swr.de's own first-party API (no browser, verified results). Use when the user wants anything from swr.de, e.g. open a swr news article page."
---

# Unbrowse for Swr (swr.de)

Swr as tools for your agent. Unofficial: not affiliated with or endorsed by swr.de. Unbrowse compiled these from swr.de's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no swr.de API key.

## Connect the swr.de MCP

This server is a tool scope holding only swr.de: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on swr.de.

```sh
claude mcp add --transport http swr-de https://unbrowse.ai/mcp/swr.de
codex mcp add swr-de --url https://unbrowse.ai/mcp/swr.de && codex mcp login swr-de
```

```json
{"mcpServers":{"swr-de":{"url":"https://unbrowse.ai/mcp/swr.de"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch swr.de some other way and present it as this skill's result.

## Tools

### `swr_de__get_baden_wuerttemberg_7_b3_7_d` — Open a SWR news article page

Open a SWR news article page.

- `width` (integer) — optional, e.g. "320"

```json
{"width":320}
```

### `swr_de__read_page` — Read a page on swr.de

Read any page on swr.de — a path such as /news/2026/some-story, or a full swr.de URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on swr.de: a path like /about, or a full URL on swr.de

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on swr.de in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on swr.de), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on swr.de → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off swr.de is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills swr.de's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/swr.de/call/swr_de__get_baden_wuerttemberg_7_b3_7_d \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"width":320}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/swr.de/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
