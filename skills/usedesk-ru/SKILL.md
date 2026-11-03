---
name: usedesk-ru
description: "Usedesk (usedesk.ru) for agents: marsique — Юздеск 161951: основной отчёт, теги; marsique — Юздеск 161951: основной отчёт, статусы; marsique — Юздеск 161951: основной отчёт, шаблоны; marsique — Юздеск 161951: основной отчёт, правила — through Unbrowse's scoped MCP for usedesk.ru (unofficial), which replays usedesk.ru's own first-party API (no browser, verified results). Use when the user wants anything from usedesk.ru, e.g. marsique — юздеск 161951: основной отчёт, теги."
---

# Unbrowse for Usedesk (usedesk.ru)

Usedesk as tools for your agent. Unofficial: not affiliated with or endorsed by usedesk.ru. Unbrowse compiled these from usedesk.ru's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no usedesk.ru API key.

## Connect the usedesk.ru MCP

This server is a tool scope holding only usedesk.ru: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on usedesk.ru.

```sh
claude mcp add --transport http usedesk-ru https://unbrowse.ai/mcp/usedesk.ru
codex mcp add usedesk-ru --url https://unbrowse.ai/mcp/usedesk.ru && codex mcp login usedesk-ru
```

```json
{"mcpServers":{"usedesk-ru":{"url":"https://unbrowse.ai/mcp/usedesk.ru"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch usedesk.ru some other way and present it as this skill's result.

## Tools

### `secure_usedesk_ru__get_get_data_tickets_by_tags` — marsique — Юздеск 161951: основной отчёт, теги

marsique — Юздеск 161951: основной отчёт, теги. Inputs: date_range. Also takes the site's own parameters, each optional (left out, the recorded value is sent): compare_previous_period (recorded: "1"). Returns draw, recordsTotal, recordsFiltered, data. Read-only on secure.usedesk.ru.

- `date_range` (string, required) — date range
- `compare_previous_period` (integer) — optional, e.g. "1"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"date_range":"<date_range>"}
```

### `secure_usedesk_ru__get_get_data_ticket_list_by_status` — marsique — Юздеск 161951: основной отчёт, статусы

marsique — Юздеск 161951: основной отчёт, статусы. Inputs: date_range. Also takes the site's own parameters, each optional (left out, the recorded value is sent): compare_previous_period (recorded: "1"). Returns all_new, active, ended, merged. Read-only on secure.usedesk.ru.

- `date_range` (string, required) — date range
- `compare_previous_period` (integer) — optional, e.g. "1"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"date_range":"<date_range>"}
```

### `secure_usedesk_ru__get_get_data_macroses_count` — marsique — Юздеск 161951: основной отчёт, шаблоны

marsique — Юздеск 161951: основной отчёт, шаблоны. Inputs: date_range. Also takes the site's own parameters, each optional (left out, the recorded value is sent): compare_previous_period (recorded: "1"). Returns draw, recordsTotal, recordsFiltered, data. Read-only on secure.usedesk.ru.

- `date_range` (string, required) — date range
- `compare_previous_period` (integer) — optional, e.g. "1"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"date_range":"<date_range>"}
```

### `secure_usedesk_ru__get_get_data_triggers_count` — marsique — Юздеск 161951: основной отчёт, правила

marsique — Юздеск 161951: основной отчёт, правила. Inputs: date_range. Also takes the site's own parameters, each optional (left out, the recorded value is sent): compare_previous_period (recorded: "1"). Returns draw, recordsTotal, recordsFiltered, data. Read-only on secure.usedesk.ru.

- `date_range` (string, required) — date range
- `compare_previous_period` (integer) — optional, e.g. "1"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"date_range":"<date_range>"}
```

Always there too: `unbrowse_run` (a task on usedesk.ru in plain words), `unbrowse_inspect`, `unbrowse_resume`, `unbrowse_scrape` and `unbrowse_map` (any page on usedesk.ru), and the recorded cloud browser `unbrowse_browse_open` → `unbrowse_browse_act` → `unbrowse_browse_finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse_resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse_run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse_browse_open` on usedesk.ru → `unbrowse_browse_act` → `unbrowse_browse_finish`, which compiles a new tool this server lists next time. Anything off usedesk.ru is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse_browse_act` with `action: "autofill"` fills usedesk.ru's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/secure.usedesk.ru/call/secure_usedesk_ru__get_get_data_tickets_by_tags \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"date_range":"<date_range>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/secure.usedesk.ru/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
