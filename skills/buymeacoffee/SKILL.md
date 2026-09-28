---
name: buymeacoffee
description: "Buymeacoffee (buymeacoffee.com) for agents: Browse featured creators on Buy Me a Coffee homepage; View a creator's shop items; Read a creator's posts feed; Read a page on buymeacoffee.com — through Unbrowse's scoped MCP for buymeacoffee.com (unofficial), which replays buymeacoffee.com's own first-party API (no browser, verified results). Use when the user wants anything from buymeacoffee.com, e.g. browse featured creators on buy me a coffee homepage."
---

# Unbrowse for Buymeacoffee (buymeacoffee.com)

Buymeacoffee as tools for your agent. Unofficial: not affiliated with or endorsed by buymeacoffee.com. Unbrowse compiled these from buymeacoffee.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no buymeacoffee.com API key.

## Connect the buymeacoffee.com MCP

This server is a tool scope holding only buymeacoffee.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on buymeacoffee.com.

```sh
claude mcp add --transport http buymeacoffee https://unbrowse.ai/mcp/buymeacoffee.com
codex mcp add buymeacoffee --url https://unbrowse.ai/mcp/buymeacoffee.com && codex mcp login buymeacoffee
```

```json
{"mcpServers":{"buymeacoffee":{"url":"https://unbrowse.ai/mcp/buymeacoffee.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch buymeacoffee.com some other way and present it as this skill's result.

## Tools

### `buymeacoffee_com__get_project_7_b4_7_d` — Browse featured creators on Buy Me a Coffee homepage

Browse featured creators on Buy Me a Coffee homepage.

- `page` (integer) — optional, e.g. "1"
- `per_page` (integer) — optional, e.g. "10"

```json
{"page":1,"per_page":10}
```

### `buymeacoffee_com__get_list_kaleighcohen` — View a creator's shop items

View a creator's shop items.

- `page` (integer) — optional, e.g. "1"

```json
{"page":1}
```

### `buymeacoffee_com__get_creator_kaleighcohen` — Read a creator's posts feed

Read a creator's posts feed.

- `per_page` (integer) — optional, e.g. "9"
- `page` (integer) — optional, e.g. "1"
- `filter_by` (string) — optional, e.g. "new"

```json
{"per_page":9,"page":1,"filter_by":"new"}
```

### `buymeacoffee_com__read_page` — Read a page on buymeacoffee.com

Read any page on buymeacoffee.com — a path such as /news/2026/some-story, or a full buymeacoffee.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on buymeacoffee.com: a path like /about, or a full URL on buymeacoffee.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on buymeacoffee.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on buymeacoffee.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on buymeacoffee.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off buymeacoffee.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills buymeacoffee.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/buymeacoffee.com/call/buymeacoffee_com__get_project_7_b4_7_d \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"page":1,"per_page":10}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/buymeacoffee.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
