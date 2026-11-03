---
name: datos-gob-ar
description: "Datos (datos.gob.ar) for agents: Datos Argentina dataset search; Sistema de Contrataciones dataset page — through Unbrowse's scoped MCP for datos.gob.ar (unofficial), which replays datos.gob.ar's own first-party API (no browser, verified results). Use when the user wants anything from datos.gob.ar, e.g. datos argentina dataset search."
---

# Unbrowse for Datos (datos.gob.ar)

Datos as tools for your agent. Unofficial: not affiliated with or endorsed by datos.gob.ar. Unbrowse compiled these from datos.gob.ar's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no datos.gob.ar API key.

## Connect the datos.gob.ar MCP

This server is a tool scope holding only datos.gob.ar: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on datos.gob.ar.

```sh
claude mcp add --transport http datos-gob-ar https://unbrowse.ai/mcp/datos.gob.ar
codex mcp add datos-gob-ar --url https://unbrowse.ai/mcp/datos.gob.ar && codex mcp login datos-gob-ar
```

```json
{"mcpServers":{"datos-gob-ar":{"url":"https://unbrowse.ai/mcp/datos.gob.ar"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch datos.gob.ar some other way and present it as this skill's result.

## Tools

### `datos_gob_ar__get_dataset` — Datos Argentina dataset search

Datos Argentina dataset search. Inputs: q. Returns the page's title, readable text and links. Read-only on datos.gob.ar.

- `q` (string, required)
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"q":"<q>"}
```

### `datos_gob_ar__read_page` — Sistema de Contrataciones dataset page

Sistema de Contrataciones dataset page. Inputs: name. Returns the page's title, readable text and links. Read-only on datos.gob.ar.

- `name` (string, required)
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"name":"<name>"}
```

Always there too: `unbrowse_run` (a task on datos.gob.ar in plain words), `unbrowse_inspect`, `unbrowse_resume`, `unbrowse_scrape` and `unbrowse_map` (any page on datos.gob.ar), and the recorded cloud browser `unbrowse_browse_open` → `unbrowse_browse_act` → `unbrowse_browse_finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse_resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse_run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse_browse_open` on datos.gob.ar → `unbrowse_browse_act` → `unbrowse_browse_finish`, which compiles a new tool this server lists next time. Anything off datos.gob.ar is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse_browse_act` with `action: "autofill"` fills datos.gob.ar's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/datos.gob.ar/call/datos_gob_ar__get_dataset \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"q":"<q>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/datos.gob.ar/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
