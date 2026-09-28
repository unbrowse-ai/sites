---
name: univie-ac-at
description: "Univie (univie.ac.at) for agents: Search ufind.univie.ac.at; Search the website; Read a page on univie.ac.at — through Unbrowse's scoped MCP for univie.ac.at (unofficial), which replays univie.ac.at's own first-party API (no browser, verified results). Use when the user wants anything from univie.ac.at, e.g. search ufind.univie.ac.at."
---

# Unbrowse for Univie (univie.ac.at)

Univie as tools for your agent. Unofficial: not affiliated with or endorsed by univie.ac.at. Unbrowse compiled these from univie.ac.at's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no univie.ac.at API key.

## Connect the univie.ac.at MCP

This server is a tool scope holding only univie.ac.at: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on univie.ac.at.

```sh
claude mcp add --transport http univie-ac-at https://unbrowse.ai/mcp/univie.ac.at
codex mcp add univie-ac-at --url https://unbrowse.ai/mcp/univie.ac.at && codex mcp login univie-ac-at
```

```json
{"mcpServers":{"univie-ac-at":{"url":"https://unbrowse.ai/mcp/univie.ac.at"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch univie.ac.at some other way and present it as this skill's result.

## Tools

### `ufind_univie_ac_at__get_search` — Search ufind.univie.ac.at

Search ufind.univie.ac.at with its own search (homepage search form) and read the results page as title, text and links. One first-party HTTP request, no browser.

- `query` (string, required) — query — what to search for on ufind.univie.ac.at

```json
{"query":"wien"}
```

### `univie_ac_at__get_suche` — Search the website

Search the website.

- `query` (string, required) — query (typed during “fill Seiten durchsuchen”)

```json
{"query":"<query>"}
```

### `univie_ac_at__read_page` — Read a page on univie.ac.at

Read any page on univie.ac.at — a path such as /news/2026/some-story, or a full univie.ac.at URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on univie.ac.at: a path like /about, or a full URL on univie.ac.at

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on univie.ac.at in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on univie.ac.at), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on univie.ac.at → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off univie.ac.at is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills univie.ac.at's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/ufind.univie.ac.at/call/ufind_univie_ac_at__get_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"wien"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/ufind.univie.ac.at/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
