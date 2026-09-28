# Unbrowse for Yahoo — MCP & skill (unofficial)

yahoo.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by yahoo.com.

| Tool | What it does |
|---|---|
| `currently_att_yahoo_com__get_yhs_search` | Search att.net |
| `malaysia_yahoo_com__get_search` | Search yahoo.com |
| `sg_news_yahoo_com__get_search` | Search sg.news.yahoo.com |
| `tech_yahoo_com__read_page` | Read a page on tech.yahoo.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/yahoo.com`

```sh
claude mcp add --transport http yahoo https://unbrowse.ai/mcp/yahoo.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill yahoo` (or `npx skills add unbrowse-ai/sites --skill yahoo`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/yahoo.com/openapi.json
