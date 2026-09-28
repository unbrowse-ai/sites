# Unbrowse for Ibbs — MCP & skill (unofficial)

ibbs.pro as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by ibbs.pro.

| Tool | What it does |
|---|---|
| `ibbs_pro__get_search` | Search ibbs.pro |
| `ibbs_pro__read_page` | Read a page on ibbs.pro |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/ibbs.pro`

```sh
claude mcp add --transport http ibbs-pro https://unbrowse.ai/mcp/ibbs.pro
```

**Skill**: `npx skills add https://unbrowse.ai --skill ibbs-pro` (or `npx skills add unbrowse-ai/sites --skill ibbs-pro`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/ibbs.pro/openapi.json
