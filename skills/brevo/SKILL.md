---
name: brevo
description: "Brevo (brevo.com) for agents: View Brevo pricing plans; Explore Brevo homepage and product categories; Read a page on brevo.com — through Unbrowse's scoped MCP for brevo.com (unofficial), which replays brevo.com's own first-party API (no browser, verified results). Use when the user wants anything from brevo.com, e.g. view brevo pricing plans."
---

# Unbrowse for Brevo (brevo.com)

Brevo as tools for your agent. Unofficial: not affiliated with or endorsed by brevo.com. Unbrowse compiled these from brevo.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no brevo.com API key.

## Connect the brevo.com MCP

This server is a tool scope holding only brevo.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on brevo.com.

```sh
claude mcp add --transport http brevo https://unbrowse.ai/mcp/brevo.com
codex mcp add brevo --url https://unbrowse.ai/mcp/brevo.com && codex mcp login brevo
```

```json
{"mcpServers":{"brevo":{"url":"https://unbrowse.ai/mcp/brevo.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch brevo.com some other way and present it as this skill's result.

## Tools

### `brevo_com__get_plans_all` — View Brevo pricing plans

View Brevo pricing plans. No inputs. Returns currency_code, user_seat, discount_percentages, plans. Read-only on brevo.com.

- none
- 1 more of the site's own parameters (locale, paging and the like), sent as recorded

```json
{}
```

### `brevo_com__get_7_h098_web` — Explore Brevo homepage and product categories

Explore Brevo homepage and product categories. No inputs. Returns AjaxWatches, BehaviorSignalSettings, Domains, ElementBlocks, NamedElementBlocks, ElementDeferreds, ElementKeeps, ElementWatches. Read-only on brevo.com.

- none

```json
{}
```

### `brevo_com__read_page` — Read a page on brevo.com

Read any page on brevo.com — a path such as /news/2026/some-story, or a full brevo.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on brevo.com.

- `path` (string, required) — A page on brevo.com: a path like /about, or a full URL on brevo.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on brevo.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on brevo.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on brevo.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off brevo.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills brevo.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/brevo.com/call/brevo_com__get_plans_all \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/brevo.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
