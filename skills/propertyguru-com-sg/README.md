# Unbrowse for Propertyguru — MCP & skill (unofficial)

propertyguru.com.sg as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by propertyguru.com.sg.

| Tool | What it does |
|---|---|
| `propertyguru_com_sg__render_page` | Search propertyguru.com.sg |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/propertyguru.com.sg`

```sh
claude mcp add --transport http propertyguru-com-sg https://unbrowse.ai/mcp/propertyguru.com.sg
```

**Skill**: `npx skills add https://unbrowse.ai --skill propertyguru-com-sg` (or `npx skills add unbrowse-ai/sites --skill propertyguru-com-sg`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/propertyguru.com.sg/openapi.json
