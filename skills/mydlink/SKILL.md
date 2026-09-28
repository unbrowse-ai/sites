---
name: mydlink
description: "Mydlink (mydlink.com) for agents: Browse cloud cameras; List mydlink cloud cameras; List cloud camera products; View mydlink app download links — through Unbrowse's scoped MCP for mydlink.com (unofficial), which replays mydlink.com's own first-party API (no browser, verified results). Use when the user wants anything from mydlink.com, e.g. browse cloud cameras."
---

# Unbrowse for Mydlink (mydlink.com)

Mydlink as tools for your agent. Unofficial: not affiliated with or endorsed by mydlink.com. Unbrowse compiled these from mydlink.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no mydlink.com API key.

## Connect the mydlink.com MCP

This server is a tool scope holding only mydlink.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on mydlink.com.

```sh
claude mcp add --transport http mydlink https://unbrowse.ai/mcp/mydlink.com
codex mcp add mydlink --url https://unbrowse.ai/mcp/mydlink.com && codex mcp login mydlink
```

```json
{"mcpServers":{"mydlink":{"url":"https://unbrowse.ai/mcp/mydlink.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch mydlink.com some other way and present it as this skill's result.

## Tools

### `eu_mydlink_com__get_product_region_xml` — Browse cloud cameras

Browse cloud cameras. No inputs. Returns text. Read-only on eu.mydlink.com.

- none

```json
{}
```

### `la_mydlink_com__get_product_region` — List mydlink cloud cameras

List mydlink cloud cameras. No inputs. Returns text. Read-only on la.mydlink.com.

- none

```json
{}
```

### `in_mydlink_com__get_product_region` — List cloud camera products

List cloud camera products. No inputs. Returns text. Read-only on in.mydlink.com.

- none

```json
{}
```

### `la_mydlink_com__read_page` — View mydlink app download links

View mydlink app download links. Inputs: name. Returns the page's title, readable text and links. Read-only on la.mydlink.com.

- `name` (string, required)

```json
{"name":"<name>"}
```

Always there too: `unbrowse.run` (a task on mydlink.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on mydlink.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on mydlink.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off mydlink.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills mydlink.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/eu.mydlink.com/call/eu_mydlink_com__get_product_region_xml \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/eu.mydlink.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
