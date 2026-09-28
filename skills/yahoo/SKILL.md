---
name: yahoo
description: "Yahoo (yahoo.com) for agents: Search att.net; Search yahoo.com; Search sg.news.yahoo.com; Read a page on tech.yahoo.com — through Unbrowse's scoped MCP for yahoo.com (unofficial), which replays yahoo.com's own first-party API (no browser, verified results). Use when the user wants anything from yahoo.com, e.g. search att.net."
---

# Unbrowse for Yahoo (yahoo.com)

Yahoo as tools for your agent. Unofficial: not affiliated with or endorsed by yahoo.com. Unbrowse compiled these from yahoo.com's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no yahoo.com API key.

## Connect the yahoo.com MCP

This server is a tool scope holding only yahoo.com: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on yahoo.com.

```sh
claude mcp add --transport http yahoo https://unbrowse.ai/mcp/yahoo.com
codex mcp add yahoo --url https://unbrowse.ai/mcp/yahoo.com && codex mcp login yahoo
```

```json
{"mcpServers":{"yahoo":{"url":"https://unbrowse.ai/mcp/yahoo.com"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch yahoo.com some other way and present it as this skill's result.

## Tools

### `currently_att_yahoo_com__get_yhs_search` — Search att.net

Read yhs search on currently.att.yahoo.com on Currently.com - AT&amp;T Yahoo Email, News, Sports &amp; More (currently.att.yahoo.com) in one call. Recorded for: “search currently.att.yahoo.com for trump”; “search currently.att.yahoo.com for navy”; “search currently.att.yahoo.com for navy — Search att.net for navy”. Learned from 2 browser traces; chains load_root → get_yhs_search.

- `query` (string, required) — query (typed during “fill Search Query for Search the web”), e.g. "trump", "navy"

```json
{"query":"trump"}
```

### `malaysia_yahoo_com__get_search` — Search yahoo.com

Read search on malaysia.yahoo.com on Yahoo! Malaysia | Mail, Weather, Search, Politics, News, Finance, Sports and Videos (malaysia.yahoo.com) in one call. Recorded for: “search malaysia.yahoo.com for najib”; “search malaysia.yahoo.com for fine”; “search malaysia.yahoo.com for fine — Search yahoo.com for fine”. Learned from 2 browser traces; chains get_root → get_search.

- `query` (string, required) — query (typed during “fill Search Query for Search the web”), e.g. "najib", "fine"
- `p` (string) — optional, e.g. "us"
- `fr` (string) — optional, e.g. "yfp-t"
- `fr2` (string) — optional, e.g. "p:fp,m:sb"
- `fp` (integer) — optional, e.g. "1"

```json
{"query":"najib"}
```

### `sg_news_yahoo_com__get_search` — Search sg.news.yahoo.com

Read search on sg.news.yahoo.com on Latest news and current events updates | Yahoo News Singapore (sg.news.yahoo.com) in one call. Recorded for: “search sg.news.yahoo.com for trump”; “search sg.news.yahoo.com for after”; “search sg.news.yahoo.com for after — Search sg.news.yahoo.com for after”. Learned from 2 browser traces; chains load_root → get_search.

- `query` (string, required) — query (typed during “fill Search Query for Search the web”), e.g. "trump", "after"
- `fr` (string) — optional, e.g. "uh3_news_web"
- `fr2` (string) — optional, e.g. "p:news,m:sb"

```json
{"query":"trump"}
```

### `tech_yahoo_com__read_page` — Read a page on tech.yahoo.com

Read any page on tech.yahoo.com — a path such as /news/2026/some-story, or a full tech.yahoo.com URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on tech.yahoo.com: a path like /about, or a full URL on tech.yahoo.com

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on yahoo.com in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on yahoo.com), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on yahoo.com → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off yahoo.com is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills yahoo.com's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/currently.att.yahoo.com/call/currently_att_yahoo_com__get_yhs_search \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"trump"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/currently.att.yahoo.com/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
