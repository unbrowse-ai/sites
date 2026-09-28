---
name: barracuda
description: "Barracuda (barracuda.com) for agents: Search the site; Open a product page; Read a page on barracuda.com — through Unbrowse's scoped MCP for barracuda.com (unofficial), which replays barracuda.com's own first-party API (no browser, verified results). Use when the user wants anything from barracuda.com, e.g. search the site."
---

# Unbrowse for Barracuda (barracuda.com)

Barracuda as tools for your agent. Unofficial: not affiliated with or endorsed by barracuda.com. Unbrowse compiled these from barracuda.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no barracuda.com API key.

## Connect the barracuda.com MCP

This server is a tool scope holding only barracuda.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on barracuda.com.

```sh
claude mcp add --transport http barracuda https://unbrowse.ai/mcp/barracuda.com
codex mcp add barracuda --url https://unbrowse.ai/mcp/barracuda.com && codex mcp login barracuda
```

```json
{"mcpServers":{"barracuda":{"url":"https://unbrowse.ai/mcp/barracuda.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch barracuda.com some other way and present it as this skill's result.

## Tools

### `barracuda_com__get_root` — Search the site

Search the site. Inputs: query. Returns the page's title, readable text and links. Read-only on barracuda.com.

- `query` (string, required) — query (typed during “fill Search field”)

```json
{"query":"<query>"}
```

### `barracuda_com__get_iframe_subscribe_blog` — Open a product page

Open a product page. No inputs. Returns the page's title, readable text and links. Read-only on barracuda.com.

- `form_label_color` (string) — optional, e.g. "FFFFFF"

```json
{"form_label_color":"FFFFFF"}
```

### `barracuda_com__read_page` — Read a page on barracuda.com

Read any page on barracuda.com — a path such as /news/2026/some-story, or a full barracuda.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on barracuda.com.

- `path` (string, required) — A page on barracuda.com: a path like /about, or a full URL on barracuda.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on barracuda.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on barracuda.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on barracuda.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off barracuda.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills barracuda.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/barracuda.com/call/barracuda_com__get_root \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/barracuda.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
