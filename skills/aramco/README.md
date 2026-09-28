# Unbrowse for Aramco — MCP & skill (unofficial)

aramco.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by aramco.com.

| Tool | What it does |
|---|---|
| `aramco_com__get_render_jss` | Open a news article |
| `aramco_com__get_article` | Search news articles |
| `aramco_com__read_page` | Read a page on aramco.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/aramco.com`

```sh
claude mcp add --transport http aramco https://unbrowse.ai/mcp/aramco.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill aramco` (or `npx skills add unbrowse-ai/sites --skill aramco`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/aramco.com/openapi.json
