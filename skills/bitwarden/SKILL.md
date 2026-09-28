---
name: bitwarden
description: "Bitwarden (bitwarden.com) for agents: Read Bitwarden pricing for personal and business plans; Browse Bitwarden product and solution pages; Read a page on bitwarden.com — through Unbrowse's scoped MCP for bitwarden.com (unofficial), which replays bitwarden.com's own first-party API (no browser, verified results). Use when the user wants anything from bitwarden.com, e.g. read bitwarden pricing for personal and business plans."
---

# Unbrowse for Bitwarden (bitwarden.com)

Bitwarden as tools for your agent. Unofficial: not affiliated with or endorsed by bitwarden.com. Unbrowse compiled these from bitwarden.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no bitwarden.com API key.

## Connect the bitwarden.com MCP

This server is a tool scope holding only bitwarden.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on bitwarden.com.

```sh
claude mcp add --transport http bitwarden https://unbrowse.ai/mcp/bitwarden.com
codex mcp add bitwarden --url https://unbrowse.ai/mcp/bitwarden.com && codex mcp login bitwarden
```

```json
{"mcpServers":{"bitwarden":{"url":"https://unbrowse.ai/mcp/bitwarden.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch bitwarden.com some other way and present it as this skill's result.

## Tools

### `bitwarden_com__get_pricing_all` — Read Bitwarden pricing for personal and business plans

Read Bitwarden pricing for personal and business plans.

- none

```json
{}
```

### `bitwarden_com__get_solutions_healthcare` — Browse Bitwarden product and solution pages

Browse Bitwarden product and solution pages.

- none

```json
{}
```

### `bitwarden_com__read_page` — Read a page on bitwarden.com

Read any page on bitwarden.com — a path such as /news/2026/some-story, or a full bitwarden.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on bitwarden.com: a path like /about, or a full URL on bitwarden.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on bitwarden.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on bitwarden.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on bitwarden.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off bitwarden.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills bitwarden.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/bitwarden.com/call/bitwarden_com__get_pricing_all \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/bitwarden.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
