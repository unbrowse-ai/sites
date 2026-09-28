---
name: expressen-se
description: "Expressen (expressen.se) for agents: Search news articles; Open an article page; Browse a news section; Read a page on expressen.se — through Unbrowse's scoped MCP for expressen.se (unofficial), which replays expressen.se's own first-party API (no browser, verified results). Use when the user wants anything from expressen.se, e.g. search news articles."
---

# Unbrowse for Expressen (expressen.se)

Expressen as tools for your agent. Unofficial: not affiliated with or endorsed by expressen.se. Unbrowse compiled these from expressen.se's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no expressen.se API key.

## Connect the expressen.se MCP

This server is a tool scope holding only expressen.se: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on expressen.se.

```sh
claude mcp add --transport http expressen-se https://unbrowse.ai/mcp/expressen.se
codex mcp add expressen-se --url https://unbrowse.ai/mcp/expressen.se && codex mcp login expressen-se
```

```json
{"mcpServers":{"expressen-se":{"url":"https://unbrowse.ai/mcp/expressen.se"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch expressen.se some other way and present it as this skill's result.

## Tools

### `expressen_se__get_sok` — Search news articles

Search news articles. Inputs: query. Returns the page's title, readable text and links. Read-only on expressen.se.

- `query` (string, required) — query (typed during “fill Sök på Expressen”)
- `sort` (string) — optional, e.g. "date"

```json
{"query":"<query>"}
```

### `expressen_se__get_comment_api_comments_by_id` — Open an article page

Open an article page. No inputs. Returns data. Read-only on expressen.se.

- `sort` (string) — optional, e.g. "datePublished:desc"

```json
{"sort":"datePublished:desc"}
```

### `expressen_se__get_video_player_playlist_by_id` — Browse a news section

Browse a news section. No inputs. Returns title, videos, randomize, aspectRatio, description, id. Read-only on expressen.se.

- none

```json
{}
```

### `expressen_se__read_page` — Read a page on expressen.se

Read any page on expressen.se — a path such as /news/2026/some-story, or a full expressen.se URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on expressen.se.

- `path` (string, required) — A page on expressen.se: a path like /about, or a full URL on expressen.se

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on expressen.se in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on expressen.se), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on expressen.se → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off expressen.se is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills expressen.se's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/expressen.se/call/expressen_se__get_sok \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/expressen.se/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
