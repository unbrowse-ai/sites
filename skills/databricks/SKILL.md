---
name: databricks
description: "Databricks (databricks.com) for agents: Browse Databricks blog posts by category; Browse product pages on Databricks; Read a page on databricks.com — through Unbrowse's scoped MCP for databricks.com (unofficial), which replays databricks.com's own first-party API (no browser, verified results). Use when the user wants anything from databricks.com, e.g. browse databricks blog posts by category."
---

# Unbrowse for Databricks (databricks.com)

Databricks as tools for your agent. Unofficial: not affiliated with or endorsed by databricks.com. Unbrowse compiled these from databricks.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no databricks.com API key.

## Connect the databricks.com MCP

This server is a tool scope holding only databricks.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on databricks.com.

```sh
claude mcp add --transport http databricks https://unbrowse.ai/mcp/databricks.com
codex mcp add databricks --url https://unbrowse.ai/mcp/databricks.com && codex mcp login databricks
```

```json
{"mcpServers":{"databricks":{"url":"https://unbrowse.ai/mcp/databricks.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch databricks.com some other way and present it as this skill's result.

## Tools

### `databricks_com__get_data_strategy_page_data_json` — Browse Databricks blog posts by category

Browse Databricks blog posts by category. Inputs: blog. Returns componentChunkName, path, result, staticQueryHashes, slicesMap. Read-only on databricks.com.

- `blog` (string, required)

```json
{"blog":"<blog>"}
```

### `databricks_com__get_data_lakehouse_page_data_json` — Browse product pages on Databricks

Browse product pages on Databricks. No inputs. Returns componentChunkName, path, result, staticQueryHashes, slicesMap. Read-only on databricks.com.

- none

```json
{}
```

### `databricks_com__read_page` — Read a page on databricks.com

Read any page on databricks.com — a path such as /news/2026/some-story, or a full databricks.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on databricks.com.

- `path` (string, required) — A page on databricks.com: a path like /about, or a full URL on databricks.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on databricks.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on databricks.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on databricks.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off databricks.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills databricks.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/databricks.com/call/databricks_com__get_data_strategy_page_data_json \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"blog":"<blog>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/databricks.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
