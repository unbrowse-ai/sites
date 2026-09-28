---
name: faz
description: "Faz (faz.net) for agents: Search articles; Read a page on faz.net — through Unbrowse's scoped MCP for faz.net (unofficial), which replays faz.net's own first-party API (no browser, verified results). Use when the user wants anything from faz.net, e.g. search articles."
---

# Unbrowse for Faz (faz.net)

Faz as tools for your agent. Unofficial: not affiliated with or endorsed by faz.net. Unbrowse compiled these from faz.net's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no faz.net API key.

## Connect the faz.net MCP

This server is a tool scope holding only faz.net: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on faz.net.

```sh
claude mcp add --transport http faz https://unbrowse.ai/mcp/faz.net
codex mcp add faz --url https://unbrowse.ai/mcp/faz.net && codex mcp login faz
```

```json
{"mcpServers":{"faz":{"url":"https://unbrowse.ai/mcp/faz.net"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch faz.net some other way and present it as this skill's result.

## Tools

### `faz_net__get_suche_search` — Search articles

Search articles.

- `query` (string, required)
- `type` (string) — optional, e.g. "default"
- `page` (integer) — optional, e.g. "1"
- `origin` (string) — optional, e.g. "searchsite"

```json
{"query":"<query>"}
```

### `faz_net__read_page` — Read a page on faz.net

Read any page on faz.net — a path such as /news/2026/some-story, or a full faz.net URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on faz.net: a path like /about, or a full URL on faz.net

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on faz.net in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on faz.net), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on faz.net → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off faz.net is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills faz.net's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/faz.net/call/faz_net__get_suche_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/faz.net/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
