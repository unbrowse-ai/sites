---
name: aepd-es
description: "Aepd (aepd.es) for agents: Search AEPD publications and resolutions; Search AEPD frequently asked questions; Read a page on aepd.es — through Unbrowse's scoped MCP for aepd.es (unofficial), which replays aepd.es's own first-party API (no browser, verified results). Use when the user wants anything from aepd.es, e.g. search aepd publications and resolutions."
---

# Unbrowse for Aepd (aepd.es)

Aepd as tools for your agent. Unofficial: not affiliated with or endorsed by aepd.es. Unbrowse compiled these from aepd.es's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no aepd.es API key.

## Connect the aepd.es MCP

This server is a tool scope holding only aepd.es: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on aepd.es.

```sh
claude mcp add --transport http aepd-es https://unbrowse.ai/mcp/aepd.es
codex mcp add aepd-es --url https://unbrowse.ai/mcp/aepd.es && codex mcp login aepd-es
```

```json
{"mcpServers":{"aepd-es":{"url":"https://unbrowse.ai/mcp/aepd.es"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch aepd.es some other way and present it as this skill's result.

## Tools

### `aepd_es__get_buscador` — Search AEPD publications and resolutions

Search AEPD publications and resolutions. Inputs: query. Returns the page's title, readable text and links. Read-only on aepd.es.

- `query` (string, required) — query (typed during “fill Buscador general”)

```json
{"query":"<query>"}
```

### `aepd_es__get_preguntas_frecuentes_buscador` — Search AEPD frequently asked questions

Search AEPD frequently asked questions. Inputs: query. Returns the page's title, readable text and links. Read-only on aepd.es.

- `query` (string, required) — query (typed during “fill Formulario de búsqueda de preguntas frecuentes”)

```json
{"query":"<query>"}
```

### `aepd_es__read_page` — Read a page on aepd.es

Read any page on aepd.es — a path such as /news/2026/some-story, or a full aepd.es URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on aepd.es.

- `path` (string, required) — A page on aepd.es: a path like /about, or a full URL on aepd.es

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on aepd.es in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on aepd.es), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on aepd.es → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off aepd.es is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills aepd.es's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/aepd.es/call/aepd_es__get_buscador \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/aepd.es/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
