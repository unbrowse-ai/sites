# Unbrowse for Almasryalyoum — MCP & skill (unofficial)

almasryalyoum.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by almasryalyoum.com.

| Tool | What it does |
|---|---|
| `almasryalyoum_com__render_page` | Search news articles |
| `almasryalyoum_com__get_ajax_widgets_article` | Open a news article |
| `almasryalyoum_com__read_page` | Read a page on almasryalyoum.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/almasryalyoum.com`

```sh
claude mcp add --transport http almasryalyoum https://unbrowse.ai/mcp/almasryalyoum.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill almasryalyoum` (or `npx skills add unbrowse-ai/sites --skill almasryalyoum`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/almasryalyoum.com/openapi.json
