---
name: lokalise
description: "Lokalise (lokalise.com) for agents: Open a Lokalise product feature page; Read Lokalise blog; Browse webinars library; Read a page on lokalise.com — through Unbrowse's scoped MCP for lokalise.com (unofficial), which replays lokalise.com's own first-party API (no browser, verified results). Use when the user wants anything from lokalise.com, e.g. open a lokalise product feature page."
---

# Unbrowse for Lokalise (lokalise.com)

Lokalise as tools for your agent. Unofficial: not affiliated with or endorsed by lokalise.com. Unbrowse compiled these from lokalise.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no lokalise.com API key.

## Connect the lokalise.com MCP

This server is a tool scope holding only lokalise.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on lokalise.com.

```sh
claude mcp add --transport http lokalise https://unbrowse.ai/mcp/lokalise.com
codex mcp add lokalise --url https://unbrowse.ai/mcp/lokalise.com && codex mcp login lokalise
```

```json
{"mcpServers":{"lokalise":{"url":"https://unbrowse.ai/mcp/lokalise.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch lokalise.com some other way and present it as this skill's result.

## Tools

### `lokalise_com__get_ai_agents_next_d_locale_oc_rest_page_txt` — Open a Lokalise product feature page

Open a Lokalise product feature page.

- `product` (string, required)

```json
{"product":"<product>"}
```

### `lokalise_com__get_blog_next_d_locale_blog_page_txt` — Read Lokalise blog

Read Lokalise blog.

- none

```json
{}
```

### `lokalise_com__get_webinars_next_d_locale_oc_rest_page_txt` — Browse webinars library

Browse webinars library.

- `name` (string, required)

```json
{"name":"<name>"}
```

### `lokalise_com__read_page` — Read a page on lokalise.com

Read any page on lokalise.com — a path such as /news/2026/some-story, or a full lokalise.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on lokalise.com: a path like /about, or a full URL on lokalise.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on lokalise.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on lokalise.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on lokalise.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off lokalise.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills lokalise.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/lokalise.com/call/lokalise_com__get_ai_agents_next_d_locale_oc_rest_page_txt \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"product":"<product>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/lokalise.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
