---
name: radiofrance-fr
description: "Radiofrance (radiofrance.fr) for agents: Search Radio France; Open a podcast page; Browse podcasts by station; Read a page on radiofrance.fr — through Unbrowse's scoped MCP for radiofrance.fr (unofficial), which replays radiofrance.fr's own first-party API (no browser, verified results). Use when the user wants anything from radiofrance.fr, e.g. search radio france."
---

# Unbrowse for Radiofrance (radiofrance.fr)

Radiofrance as tools for your agent. Unofficial: not affiliated with or endorsed by radiofrance.fr. Unbrowse compiled these from radiofrance.fr's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no radiofrance.fr API key.

## Connect the radiofrance.fr MCP

This server is a tool scope holding only radiofrance.fr: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on radiofrance.fr.

```sh
claude mcp add --transport http radiofrance-fr https://unbrowse.ai/mcp/radiofrance.fr
codex mcp add radiofrance-fr --url https://unbrowse.ai/mcp/radiofrance.fr && codex mcp login radiofrance-fr
```

```json
{"mcpServers":{"radiofrance-fr":{"url":"https://unbrowse.ai/mcp/radiofrance.fr"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch radiofrance.fr some other way and present it as this skill's result.

## Tools

### `radiofrance_fr__get_recherche_data_json` — Search Radio France

Search Radio France. Inputs: query. Returns type, nodes. Read-only on radiofrance.fr.

- `query` (string, required) — query (typed during “fill Rechercher un podcast, un épisode, une personnalité”)
- `x_sveltekit_trailing_slash` (integer) — optional, e.g. "1"
- `x_sveltekit_invalidated` (integer) — optional, e.g. "0100"

```json
{"query":"<query>"}
```

### `radiofrance_fr__get_serie_l_epopee_de_lady_liberty_data_json` — Open a podcast page

Open a podcast page. Inputs: franceinter. Returns type, nodes. Read-only on radiofrance.fr.

- `franceinter` (string, required)
- `x_sveltekit_invalidated` (integer) — optional, e.g. "1100"

```json
{"franceinter":"<franceinter>"}
```

### `radiofrance_fr__get_podcasts_data_json` — Browse podcasts by station

Browse podcasts by station. No inputs. Returns type, nodes. Read-only on radiofrance.fr.

- `x_sveltekit_invalidated` (integer) — optional, e.g. "1100"

```json
{"x_sveltekit_invalidated":1100}
```

### `radiofrance_fr__read_page` — Read a page on radiofrance.fr

Read any page on radiofrance.fr — a path such as /news/2026/some-story, or a full radiofrance.fr URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on radiofrance.fr.

- `path` (string, required) — A page on radiofrance.fr: a path like /about, or a full URL on radiofrance.fr

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on radiofrance.fr in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on radiofrance.fr), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on radiofrance.fr → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off radiofrance.fr is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills radiofrance.fr's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/radiofrance.fr/call/radiofrance_fr__get_recherche_data_json \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/radiofrance.fr/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
