---
name: skyscanner
description: "Skyscanner (skyscanner.net) for agents: Search flights: enter origin, destination, dates and travellers, then submit to — through Unbrowse's scoped MCP for skyscanner.net (unofficial), which replays skyscanner.net's own first-party API (no browser, verified results). Use when the user wants anything from skyscanner.net, e.g. search flights: enter origin, destination, dates and travellers, then submit to."
---

# Unbrowse for Skyscanner (skyscanner.net)

Skyscanner as tools for your agent. Unofficial: not affiliated with or endorsed by skyscanner.net. Unbrowse compiled these from skyscanner.net's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no skyscanner.net API key.

## Connect the skyscanner.net MCP

This server is a tool scope holding only skyscanner.net: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on skyscanner.net.

```sh
claude mcp add --transport http skyscanner https://unbrowse.ai/mcp/skyscanner.net
codex mcp add skyscanner --url https://unbrowse.ai/mcp/skyscanner.net && codex mcp login skyscanner
```

```json
{"mcpServers":{"skyscanner":{"url":"https://unbrowse.ai/mcp/skyscanner.net"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch skyscanner.net some other way and present it as this skill's result.

## Tools

### `skyscanner_net__post_radar_web_unified_search` — Search flights: enter origin, destination, dates and travellers, then submit to

Search flights: enter origin, destination, dates and travellers, then submit to . Inputs: transport. Also takes the site's own parameters, each optional (left out, the recorded value is sent): adults (recorded: "1"); cabinClass (recorded: "ECONOMY"); adults_post_radar_web_unified_search (recorded: 1). Returns text. Read-only on skyscanner.net.

- `transport` (string, required)
- `adults` (integer) — optional, e.g. "1"
- `cabinClass` (string) — optional, e.g. "ECONOMY"
- `adults_post_radar_web_unified_search` (integer) — optional, e.g. 1
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"transport":"<transport>"}
```

Always there too: `unbrowse_run` (a task on skyscanner.net in plain words), `unbrowse_inspect`, `unbrowse_resume`, `unbrowse_scrape` and `unbrowse_map` (any page on skyscanner.net), and the recorded cloud browser `unbrowse_browse_open` → `unbrowse_browse_act` → `unbrowse_browse_finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse_resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse_run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse_browse_open` on skyscanner.net → `unbrowse_browse_act` → `unbrowse_browse_finish`, which compiles a new tool this server lists next time. Anything off skyscanner.net is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse_browse_act` with `action: "autofill"` fills skyscanner.net's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/skyscanner.net/call/skyscanner_net__post_radar_web_unified_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"transport":"<transport>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/skyscanner.net/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
