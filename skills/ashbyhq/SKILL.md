---
name: ashbyhq
description: "Ashbyhq (ashbyhq.com) for agents: Ashby job board: open jobs — through Unbrowse's scoped MCP for ashbyhq.com (unofficial), which replays ashbyhq.com's own first-party API (no browser, verified results). Use when the user wants anything from ashbyhq.com, e.g. ashby job board: open jobs."
---

# Unbrowse for Ashbyhq (ashbyhq.com)

Ashbyhq as tools for your agent. Unofficial: not affiliated with or endorsed by ashbyhq.com. Unbrowse compiled these from ashbyhq.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no ashbyhq.com API key.

## Connect the ashbyhq.com MCP

This server is a tool scope holding only ashbyhq.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on ashbyhq.com.

```sh
claude mcp add --transport http ashbyhq https://unbrowse.ai/mcp/ashbyhq.com
codex mcp add ashbyhq --url https://unbrowse.ai/mcp/ashbyhq.com && codex mcp login ashbyhq
```

```json
{"mcpServers":{"ashbyhq":{"url":"https://unbrowse.ai/mcp/ashbyhq.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch ashbyhq.com some other way and present it as this skill's result.

## Tools

### `api_ashbyhq_com__get_job_board_notion` — Ashby job board: open jobs

Ashby job board: open jobs. Inputs: organization. Returns jobs, apiVersion. Read-only on api.ashbyhq.com.

- `organization` (string, required) — organization (typed during “search”)
- `includeCompensation` (string) — optional, e.g. "true"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"organization":"<organization>"}
```

Always there too: `unbrowse.run` (a task on ashbyhq.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on ashbyhq.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on ashbyhq.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off ashbyhq.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills ashbyhq.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/api.ashbyhq.com/call/api_ashbyhq_com__get_job_board_notion \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"organization":"<organization>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/api.ashbyhq.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
