---
name: sec
description: "Sec (sec.gov) for agents: Search SEC EDGAR full-text filings; Read submissions on data.sec.gov — through Unbrowse's scoped MCP for sec.gov (unofficial), which replays sec.gov's own first-party API (no browser, verified results). Use when the user wants anything from sec.gov, e.g. search sec edgar full-text filings."
---

# Unbrowse for Sec (sec.gov)

Sec as tools for your agent. Unofficial: not affiliated with or endorsed by sec.gov. Unbrowse compiled these from sec.gov's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no sec.gov API key.

## Connect the sec.gov MCP

This server is a tool scope holding only sec.gov: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on sec.gov.

```sh
claude mcp add --transport http sec https://unbrowse.ai/mcp/sec.gov
codex mcp add sec --url https://unbrowse.ai/mcp/sec.gov && codex mcp login sec
```

```json
{"mcpServers":{"sec":{"url":"https://unbrowse.ai/mcp/sec.gov"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch sec.gov some other way and present it as this skill's result.

## Tools

### `sec_gov__get_latest_search_index` — Search SEC EDGAR full-text filings

Search SEC EDGAR full-text filings. Inputs: entity_name. Also takes the site's own parameters, each optional (left out, the recorded value is sent): startdt (recorded: "2021-10-02"); enddt (recorded: "2026-10-02"). Returns took, timed_out, hits, aggregations, query. A large answer comes back as its records at hits.hits (as results); pass select for other parts. Read-only on sec.gov.

- `entity_name` (string, required) — entity name (typed during “fill Company name, ticker, CIK number or individual's name”)
- `startdt` (string) — optional, e.g. "2021-10-02"
- `enddt` (string) — optional, e.g. "2026-10-02"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing. Left out on a large answer, its records at hits.hits come back as results (the rest is named in projection).

```json
{"entity_name":"<entity_name>"}
```

### `data_sec_gov__get_submissions_by_id` — Read submissions on data.sec.gov

Read submissions on data.sec.gov. No inputs. Returns cik, entityType, sic, sicDescription, ownerOrg, insiderTransactionForOwnerExists, insiderTransactionForIssuerExists, name. A large answer comes back as its records at formerNames (as results); pass select for other parts. Read-only on data.sec.gov.

- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing. Left out on a large answer, its records at formerNames come back as results (the rest is named in projection).

```json
{}
```

Always there too: `unbrowse_run` (a task on sec.gov in plain words), `unbrowse_inspect`, `unbrowse_resume`, `unbrowse_scrape` and `unbrowse_map` (any page on sec.gov), and the recorded cloud browser `unbrowse_browse_open` → `unbrowse_browse_act` → `unbrowse_browse_finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse_resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse_run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse_browse_open` on sec.gov → `unbrowse_browse_act` → `unbrowse_browse_finish`, which compiles a new tool this server lists next time. Anything off sec.gov is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse_browse_act` with `action: "autofill"` fills sec.gov's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/sec.gov/call/sec_gov__get_latest_search_index \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"entity_name":"<entity_name>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/sec.gov/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
