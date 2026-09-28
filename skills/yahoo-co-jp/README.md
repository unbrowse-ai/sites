# Unbrowse for Yahoo — MCP & skill (unofficial)

yahoo.co.jp as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by yahoo.co.jp.

| Tool | What it does |
|---|---|
| `news_yahoo_co_jp__get_search` | Search news.yahoo.co.jp |
| `auctions_yahoo_co_jp__get_search` | Search auctions.yahoo.co.jp |
| `news_yahoo_co_jp__read_page` | Read a page on news.yahoo.co.jp |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/yahoo.co.jp`

```sh
claude mcp add --transport http yahoo-co-jp https://unbrowse.ai/mcp/yahoo.co.jp
```

**Skill**: `npx skills add https://unbrowse.ai --skill yahoo-co-jp` (or `npx skills add unbrowse-ai/sites --skill yahoo-co-jp`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/yahoo.co.jp/openapi.json
