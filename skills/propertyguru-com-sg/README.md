# Unbrowse for Propertyguru — MCP & skill (unofficial)

propertyguru.com.sg as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by propertyguru.com.sg.

| Tool | What it does |
|---|---|
| `propertyguru_com_sg__get_property_for_sale` | PropertyGuru property listings for sale |
| `propertyguru_com_sg__get_agent_profile_active_listings` | PropertyGuru agent's active listings |
| `propertyguru_com_sg__read_page` | Read a propertyguru.com.sg slug page |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/propertyguru.com.sg`

```sh
claude mcp add --transport http propertyguru-com-sg https://unbrowse.ai/mcp/propertyguru.com.sg
```

**Skill**: `npx skills add https://unbrowse.ai --skill propertyguru-com-sg` (or `npx skills add unbrowse-ai/sites --skill propertyguru-com-sg`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/propertyguru.com.sg/openapi.json
