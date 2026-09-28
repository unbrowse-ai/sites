# Unbrowse for Tmz — MCP & skill (unofficial)

tmz.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by tmz.com.

| Tool | What it does |
|---|---|
| `tmz_com__get_search` | Search TMZ news articles |
| `tmz_com__get_home_sidebar_sidebar_json` | Browse TMZ category listings |
| `tmz_com__read_page` | Read a page on tmz.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/tmz.com`

```sh
claude mcp add --transport http tmz https://unbrowse.ai/mcp/tmz.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill tmz` (or `npx skills add unbrowse-ai/sites --skill tmz`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/tmz.com/openapi.json
