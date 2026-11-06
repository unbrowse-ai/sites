---
name: acuityscheduling
description: "Acuityscheduling (acuityscheduling.com) for agents: Yay Clay Philadelphia class availability — through Unbrowse's scoped MCP for acuityscheduling.com (unofficial), which replays acuityscheduling.com's own first-party API (no browser, verified results). Use when the user wants anything from acuityscheduling.com, e.g. yay clay philadelphia class availability."
---

# Unbrowse for Acuityscheduling (acuityscheduling.com)

Acuityscheduling as tools for your agent. Unofficial: not affiliated with or endorsed by acuityscheduling.com. Unbrowse compiled these from acuityscheduling.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no acuityscheduling.com API key.

## Connect the acuityscheduling.com MCP

This server is a tool scope holding only acuityscheduling.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on acuityscheduling.com.

```sh
claude mcp add --transport http acuityscheduling https://unbrowse.ai/mcp/acuityscheduling.com
codex mcp add acuityscheduling --url https://unbrowse.ai/mcp/acuityscheduling.com && codex mcp login acuityscheduling
```

```json
{"mcpServers":{"acuityscheduling":{"url":"https://unbrowse.ai/mcp/acuityscheduling.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch acuityscheduling.com some other way and present it as this skill's result.

## Tools

### `app_acuityscheduling_com__get_availability_times` — Yay Clay Philadelphia class availability

Yay Clay Philadelphia class availability. Inputs: appointment_type_id; calendar_id; start_date. Also takes the site's own parameters, each optional (left out, the recorded value is sent): owner (recorded: "cd849a17"); timezone (recorded: "America/New_York"). Returns data. Read-only on app.acuityscheduling.com.

- `appointment_type_id` (integer, required) — appointment type id
- `calendar_id` (integer, required) — calendar id
- `start_date` (string, required) — start date
- `owner` (string) — optional, e.g. "cd849a17"
- `timezone` (string) — optional, e.g. "America/New_York"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"appointment_type_id":"<appointment_type_id>","calendar_id":"<calendar_id>","start_date":"<start_date>"}
```

Always there too: `unbrowse_run` (a task on acuityscheduling.com in plain words), `unbrowse_inspect`, `unbrowse_resume`, `unbrowse_scrape` and `unbrowse_map` (any page on acuityscheduling.com), and the recorded cloud browser `unbrowse_browse_open` → `unbrowse_browse_act` → `unbrowse_browse_finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse_resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse_run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse_browse_open` on acuityscheduling.com → `unbrowse_browse_act` → `unbrowse_browse_finish`, which compiles a new tool this server lists next time. Anything off acuityscheduling.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse_browse_act` with `action: "autofill"` fills acuityscheduling.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/app.acuityscheduling.com/call/app_acuityscheduling_com__get_availability_times \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"appointment_type_id":"<appointment_type_id>","calendar_id":"<calendar_id>","start_date":"<start_date>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/app.acuityscheduling.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
