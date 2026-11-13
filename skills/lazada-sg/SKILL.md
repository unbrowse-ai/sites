---
name: lazada-sg
description: "Lazada (lazada.sg) for agents: Search Lazada product listings — through Unbrowse's scoped MCP for lazada.sg (unofficial), which replays lazada.sg's own first-party API (no browser, verified results). Use when the user wants anything from lazada.sg, e.g. search lazada product listings."
---

# Unbrowse for Lazada (lazada.sg)

Lazada as tools for your agent. Unofficial: not affiliated with or endorsed by lazada.sg. Unbrowse compiled these from lazada.sg's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no lazada.sg API key.

## Connect the lazada.sg MCP

This server is a tool scope holding only lazada.sg: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on lazada.sg.

```sh
claude mcp add --transport http lazada-sg https://unbrowse.ai/mcp/lazada.sg
codex mcp add lazada-sg --url https://unbrowse.ai/mcp/lazada.sg && codex mcp login lazada-sg
```

```json
{"mcpServers":{"lazada-sg":{"url":"https://unbrowse.ai/mcp/lazada.sg"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch lazada.sg some other way and present it as this skill's result.

## Tools

### `lazada_sg__get_catalog` — Search Lazada product listings

Search Lazada product listings. Inputs: q. Also takes the site's own parameters, each optional (left out, the recorded value is sent): ajax (recorded: "true"); sort (recorded: "priceasc"); page (recorded: "2"); pages (recorded: 1); maxItems (recorded: 0); cursor. Returns templates, mods, mainInfo, seoInfo, nextCursor. A large answer comes back as its records at mods.listItems (as results); pass select for other parts. Read-only on lazada.sg.

- `q` (string, required)
- `ajax` (string) — optional, e.g. "true"
- `sort` (string) — optional, e.g. "priceasc"
- `page` (integer) — optional, e.g. "2"
- `pages` (integer) — Pages to fetch in this call (1–10); their items are joined into one list.
- `maxItems` (integer) — Stop once this many items are collected (0: no limit beyond pages; alone it fetches up to 10 pages).
- `cursor` (string) — Continue from here: the nextCursor a previous call returned. Left out, the first page.
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing. Left out on a large answer, its records at mods.listItems come back as results (the rest is named in projection).

```json
{"q":"<q>"}
```

Always there too: `unbrowse_run` (a task on lazada.sg in plain words), `unbrowse_inspect`, `unbrowse_resume`, `unbrowse_scrape` and `unbrowse_map` (any page on lazada.sg), and the recorded cloud browser `unbrowse_browse_open` → `unbrowse_browse_act` → `unbrowse_browse_finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse_resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse_run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse_browse_open` on lazada.sg → `unbrowse_browse_act` → `unbrowse_browse_finish`, which compiles a new tool this server lists next time. Anything off lazada.sg is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse_browse_act` with `action: "autofill"` fills lazada.sg's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/lazada.sg/call/lazada_sg__get_catalog \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"q":"<q>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/lazada.sg/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
