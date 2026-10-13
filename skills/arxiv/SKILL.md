---
name: arxiv
description: "Arxiv (arxiv.org) for agents: Search arXiv with advanced field filters such as author, title, subject category; Browse latest papers in a category; Search arXiv papers by keyword — through Unbrowse's scoped MCP for arxiv.org (unofficial), which replays arxiv.org's own first-party API (no browser, verified results). Use when the user wants anything from arxiv.org, e.g. search arxiv with advanced field filters such as author, title, subject category."
---

# Unbrowse for Arxiv (arxiv.org)

Arxiv as tools for your agent. Unofficial: not affiliated with or endorsed by arxiv.org. Unbrowse compiled these from arxiv.org's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no arxiv.org API key.

## Connect the arxiv.org MCP

This server is a tool scope holding only arxiv.org: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on arxiv.org.

```sh
claude mcp add --transport http arxiv https://unbrowse.ai/mcp/arxiv.org
codex mcp add arxiv --url https://unbrowse.ai/mcp/arxiv.org && codex mcp login arxiv
```

```json
{"mcpServers":{"arxiv":{"url":"https://unbrowse.ai/mcp/arxiv.org"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch arxiv.org some other way and present it as this skill's result.

## Tools

### `arxiv_org__get_search_advanced` — Search arXiv with advanced field filters such as author, title, subject category

Search arXiv with advanced field filters such as author, title, subject category. Inputs: name (optional); advanced (optional); title; query (optional). Also takes the site's own parameters, each optional (left out, the recorded value is sent): terms_0_operator (recorded: "AND"); classification_computer_science (recorded: "y"); classification_physics_archives (recorded: "all"); classification_include_cross_list (recorded: "include"); date_filter_by (recorded: "all_dates"); date_year. Returns the page's title, readable text and links. Read-only on arxiv.org.

- `name` (string)
- `advanced` (string)
- `title` (string, required) — title (typed during “fill Search term”)
- `query` (string)
- `terms_0_operator` (string) — optional, e.g. "AND"
- `classification_computer_science` (string) — optional, e.g. "y"
- `classification_physics_archives` (string) — optional, e.g. "all"
- `classification_include_cross_list` (string) — optional, e.g. "include"
- `date_filter_by` (string) — optional, e.g. "all_dates"
- `date_year` (string) — optional, e.g. ""
- `date_from_date` (string) — optional, e.g. ""
- `date_to_date` (string) — optional, e.g. ""
- `date_date_type` (string) — optional, e.g. "submitted_date"
- `abstracts` (string) — optional, e.g. "show"
- `size` (integer) — optional, e.g. "25"
- `order` (string) — optional, e.g. "-announced_date_first"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"title":"<title>"}
```

### `arxiv_org__get_cs_ai_recent` — Browse latest papers in a category

Browse latest papers in a category. Inputs: name. Also takes the site's own parameters, each optional (left out, the recorded value is sent): skip (recorded: "50"); show (recorded: "50"). Returns the page's title, readable text and links. Read-only on arxiv.org.

- `name` (string, required)
- `skip` (integer) — optional, e.g. "50"
- `show` (integer) — optional, e.g. "50"
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"name":"<name>"}
```

### `arxiv_org__read_page` — Search arXiv papers by keyword

Search arXiv papers by keyword. Inputs: keywords. Also takes the site's own parameters, each optional (left out, the recorded value is sent): searchtype (recorded: "all"); abstracts (recorded: "show"); order (recorded: "-announced_date_first"); size (recorded: 50). Returns the page's title, readable text and links. Read-only on arxiv.org.

- `keywords` (string, required)
- `searchtype` (string) — optional, e.g. "all"
- `abstracts` (string) — optional, e.g. "show"
- `order` (string) — optional, e.g. "-announced_date_first"
- `size` (integer) — optional, e.g. 50
- `select` (array) — Keep only these parts of the result: dots walk keys, [] maps over a list, a final {a,b} keeps several keys (e.g. "results[].{title,url}"). Unmatched paths come back in selectMissing.

```json
{"keywords":"<keywords>"}
```

Always there too: `unbrowse_run` (a task on arxiv.org in plain words), `unbrowse_inspect`, `unbrowse_resume`, `unbrowse_scrape` and `unbrowse_map` (any page on arxiv.org), and the recorded cloud browser `unbrowse_browse_open` → `unbrowse_browse_act` → `unbrowse_browse_finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse_resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse_run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse_browse_open` on arxiv.org → `unbrowse_browse_act` → `unbrowse_browse_finish`, which compiles a new tool this server lists next time. Anything off arxiv.org is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse_browse_act` with `action: "autofill"` fills arxiv.org's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/arxiv.org/call/arxiv_org__get_search_advanced \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"title":"<title>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/arxiv.org/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
