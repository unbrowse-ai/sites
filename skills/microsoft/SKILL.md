---
name: microsoft
description: "Microsoft (microsoft.com) for agents: Search windows.com; Read a page on microsoft.com — through Unbrowse's scoped MCP for microsoft.com (unofficial), which replays microsoft.com's own first-party API (no browser, verified results). Use when the user wants anything from microsoft.com, e.g. search windows.com."
---

# Unbrowse for Microsoft (microsoft.com)

Microsoft as tools for your agent. Unofficial: not affiliated with or endorsed by microsoft.com. Unbrowse compiled these from microsoft.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no microsoft.com API key.

## Connect the microsoft.com MCP

This server is a tool scope holding only microsoft.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on microsoft.com.

```sh
claude mcp add --transport http microsoft https://unbrowse.ai/mcp/microsoft.com
codex mcp add microsoft --url https://unbrowse.ai/mcp/microsoft.com && codex mcp login microsoft
```

```json
{"mcpServers":{"microsoft":{"url":"https://unbrowse.ai/mcp/microsoft.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch microsoft.com some other way and present it as this skill's result.

## Tools

### `microsoft_com__get_msstoreapiprod_autosuggest` — Search windows.com

Read msstoreapiprod autosuggest on www.microsoft.com on Experience the Power of AI with Windows 11 OS, Computers &amp; Apps | Microsoft Windows (www.microsoft.com). Use for requests like “search www.microsoft.com for windows”; “search www.microsoft.com for formerly”; “search www.microsoft.com for formerly — Search windows.com for formerly”. Learned from 2 browser traces; chains get_en_sg_windows → get_search_explore → get_msstoreapiprod_autosuggest. Inputs: query e.g. "windows". Returns ResultSets, ErrorSets. Read-only on microsoft.com.

- `query` (string, required) — query (typed during “fill Search Microsoft.com”), e.g. "windows", "formerly"

```json
{"query":"windows"}
```

### `microsoft_com__read_page` — Read a page on microsoft.com

Read any page on microsoft.com — a path such as /news/2026/some-story, or a full microsoft.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on microsoft.com.

- `path` (string, required) — A page on microsoft.com: a path like /about, or a full URL on microsoft.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on microsoft.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on microsoft.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on microsoft.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off microsoft.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills microsoft.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/microsoft.com/call/microsoft_com__get_msstoreapiprod_autosuggest \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"windows"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/microsoft.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
