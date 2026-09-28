---
name: komoot
description: "Komoot (komoot.com) for agents: Open a komoot tour (route) detail page; Read a page on komoot.com — through Unbrowse's scoped MCP for komoot.com (unofficial), which replays komoot.com's own first-party API (no browser, verified results). Use when the user wants anything from komoot.com, e.g. open a komoot tour (route) detail page."
---

# Unbrowse for Komoot (komoot.com)

Komoot as tools for your agent. Unofficial: not affiliated with or endorsed by komoot.com. Unbrowse compiled these from komoot.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no komoot.com API key.

## Connect the komoot.com MCP

This server is a tool scope holding only komoot.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on komoot.com.

```sh
claude mcp add --transport http komoot https://unbrowse.ai/mcp/komoot.com
codex mcp add komoot --url https://unbrowse.ai/mcp/komoot.com && codex mcp login komoot
```

```json
{"mcpServers":{"komoot":{"url":"https://unbrowse.ai/mcp/komoot.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch komoot.com some other way and present it as this skill's result.

## Tools

### `komoot_com__get_1_355235_103_796882_elements` — Open a komoot tour (route) detail page

Open a komoot tour (route) detail page. No inputs. Returns page. Read-only on komoot.com.

- `layout` (string) — optional, e.g. "classic"
- `profile` (integer) — optional, e.g. "1"
- `lat` (number) — optional, e.g. "1.355235"
- `lng` (number) — optional, e.g. "103.796882"
- `page` (integer) — optional, e.g. "0"
- `collection_format` (string) — optional, e.g. "v007"

```json
{"layout":"classic","profile":1,"lat":1.355235,"lng":103.796882,"page":0,"collection_format":"v007"}
```

### `komoot_com__read_page` — Read a page on komoot.com

Read any page on komoot.com — a path such as /news/2026/some-story, or a full komoot.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on komoot.com.

- `path` (string, required) — A page on komoot.com: a path like /about, or a full URL on komoot.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on komoot.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on komoot.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on komoot.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off komoot.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills komoot.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/komoot.com/call/komoot_com__get_1_355235_103_796882_elements \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"layout":"classic","profile":1,"lat":1.355235,"lng":103.796882,"page":0,"collection_format":"v007"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/komoot.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
