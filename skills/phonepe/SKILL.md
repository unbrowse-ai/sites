---
name: phonepe
description: "Phonepe (phonepe.com) for agents: Browse PhonePe blog articles by category; Read a page on phonepe.com — through Unbrowse's scoped MCP for phonepe.com (unofficial), which replays phonepe.com's own first-party API (no browser, verified results). Use when the user wants anything from phonepe.com, e.g. browse phonepe blog articles by category."
---

# Unbrowse for Phonepe (phonepe.com)

Phonepe as tools for your agent. Unofficial: not affiliated with or endorsed by phonepe.com. Unbrowse compiled these from phonepe.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no phonepe.com API key.

## Connect the phonepe.com MCP

This server is a tool scope holding only phonepe.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on phonepe.com.

```sh
claude mcp add --transport http phonepe https://unbrowse.ai/mcp/phonepe.com
codex mcp add phonepe --url https://unbrowse.ai/mcp/phonepe.com && codex mcp login phonepe
```

```json
{"mcpServers":{"phonepe":{"url":"https://unbrowse.ai/mcp/phonepe.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch phonepe.com some other way and present it as this skill's result.

## Tools

### `phonepe_com__get_insurance_page_data_json` — Browse PhonePe blog articles by category

Browse PhonePe blog articles by category. Inputs: blog. Returns componentChunkName, path, result, staticQueryHashes. Read-only on phonepe.com.

- `blog` (string, required)

```json
{"blog":"<blog>"}
```

### `phonepe_com__read_page` — Read a page on phonepe.com

Read any page on phonepe.com — a path such as /news/2026/some-story, or a full phonepe.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on phonepe.com.

- `path` (string, required) — A page on phonepe.com: a path like /about, or a full URL on phonepe.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on phonepe.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on phonepe.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on phonepe.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off phonepe.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills phonepe.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/phonepe.com/call/phonepe_com__get_insurance_page_data_json \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"blog":"<blog>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/phonepe.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
