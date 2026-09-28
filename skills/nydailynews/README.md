# Unbrowse for Nydailynews — MCP & skill (unofficial)

nydailynews.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by nydailynews.com.

| Tool | What it does |
|---|---|
| `nydailynews_com__get_search` | Search nydailynews.com |
| `nydailynews_com__read_page` | Read a page on nydailynews.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/nydailynews.com`

```sh
claude mcp add --transport http nydailynews https://unbrowse.ai/mcp/nydailynews.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill nydailynews` (or `npx skills add unbrowse-ai/sites --skill nydailynews`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/nydailynews.com/openapi.json
