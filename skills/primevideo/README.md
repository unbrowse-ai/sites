# Unbrowse for Primevideo — MCP & skill (unofficial)

primevideo.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by primevideo.com.

| Tool | What it does |
|---|---|
| `primevideo_com__get_search` | Search amazonvideo.com |
| `primevideo_com__read_page` | Read a page on primevideo.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/primevideo.com`

```sh
claude mcp add --transport http primevideo https://unbrowse.ai/mcp/primevideo.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill primevideo` (or `npx skills add unbrowse-ai/sites --skill primevideo`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/primevideo.com/openapi.json
