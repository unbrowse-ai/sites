---
name: mathworks
description: "Mathworks (mathworks.com) for agents: Open a documentation reference page; Browse the latest MATLAB blog posts; Browse MATLAB and Simulink products catalog — through Unbrowse's scoped MCP for mathworks.com (unofficial), which replays mathworks.com's own first-party API (no browser, verified results). Use when the user wants anything from mathworks.com, e.g. open a documentation reference page."
---

# Unbrowse for Mathworks (mathworks.com)

Mathworks as tools for your agent. Unofficial: not affiliated with or endorsed by mathworks.com. Unbrowse compiled these from mathworks.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no mathworks.com API key.

## Connect the mathworks.com MCP

This server is a tool scope holding only mathworks.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on mathworks.com.

```sh
claude mcp add --transport http mathworks https://unbrowse.ai/mcp/mathworks.com
codex mcp add mathworks --url https://unbrowse.ai/mcp/mathworks.com && codex mcp login mathworks
```

```json
{"mcpServers":{"mathworks":{"url":"https://unbrowse.ai/mcp/mathworks.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch mathworks.com some other way and present it as this skill's result.

## Tools

### `mathworks_com__get_r2026b_docset_json` — Open a documentation reference page

Open a documentation reference page. No inputs. Returns schema, schemaVersion, documentation_set. Read-only on mathworks.com.

- `d_visid_ver` (string) — optional, e.g. "5.2.0"
- `d_fieldgroup` (string) — optional, e.g. "A"
- `mcorgid` (string) — optional, e.g. "B1441C8B533095C00A490D4D@AdobeOrg"
- `mid` (integer) — optional, e.g. "57492643564739773931022033453450138254"

```json
{"d_visid_ver":"5.2.0","d_fieldgroup":"A","mcorgid":"B1441C8B533095C00A490D4D@AdobeOrg","mid":5.749264356473977e+37}
```

### `blogs_mathworks_com__get_announcements_blogs` — Browse the latest MATLAB blog posts

Browse the latest MATLAB blog posts. No inputs. Returns data. Read-only on blogs.mathworks.com.

- none

```json
{}
```

### `mathworks_com__read_page` — Browse MATLAB and Simulink products catalog

Browse MATLAB and Simulink products catalog. Inputs: path. Returns the page's title, readable text and links. Read-only on mathworks.com.

- `path` (string, required) — A page on mathworks.com: a path like /about, or a full URL on mathworks.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on mathworks.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on mathworks.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on mathworks.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off mathworks.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills mathworks.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/mathworks.com/call/mathworks_com__get_r2026b_docset_json \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"d_visid_ver":"5.2.0","d_fieldgroup":"A","mcorgid":"B1441C8B533095C00A490D4D@AdobeOrg","mid":5.749264356473977e+37}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/mathworks.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
