---
name: docs-rs
description: "Docs (docs.rs) for agents: Search docs.rs; search docs.rs for serde; Read a page on docs.rs — through Unbrowse's scoped MCP for docs.rs (unofficial), which replays docs.rs's own first-party API (no browser, verified results). Use when the user wants anything from docs.rs, e.g. search docs.rs."
---

# Unbrowse for Docs (docs.rs)

Docs as tools for your agent. Unofficial: not affiliated with or endorsed by docs.rs. Unbrowse compiled these from docs.rs's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no docs.rs API key.

## Connect the docs.rs MCP

This server is a tool scope holding only docs.rs: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on docs.rs.

```sh
claude mcp add --transport http docs-rs https://unbrowse.ai/mcp/docs.rs
codex mcp add docs-rs --url https://unbrowse.ai/mcp/docs.rs && codex mcp login docs-rs
```

```json
{"mcpServers":{"docs-rs":{"url":"https://unbrowse.ai/mcp/docs.rs"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch docs.rs some other way and present it as this skill's result.

## Tools

### `docs_rs__get_search` — Search docs.rs

Search docs.rs with its own search (published OpenSearch description) and read the results page as title, text and links. One first-party HTTP request, no browser. Inputs: query. Returns the page's title, readable text and links. Read-only on docs.rs.

- `query` (string, required) — query — what to search for on docs.rs

```json
{"query":"scion"}
```

### `docs_rs__get_releases_search` — search docs.rs for serde

search docs.rs for serde. Inputs: query. Returns the page's title, readable text and links. Read-only on docs.rs.

- `query` (string, required) — query (typed during “fill Find crate by search query”)

```json
{"query":"<query>"}
```

### `docs_rs__read_page` — Read a page on docs.rs

Read any page on docs.rs — a path such as /news/2026/some-story, or a full docs.rs URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on docs.rs.

- `path` (string, required) — A page on docs.rs: a path like /about, or a full URL on docs.rs

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on docs.rs in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on docs.rs), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on docs.rs → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off docs.rs is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills docs.rs's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/docs.rs/call/docs_rs__get_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"scion"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/docs.rs/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
