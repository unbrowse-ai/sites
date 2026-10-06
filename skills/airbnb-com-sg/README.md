# Unbrowse for Airbnb — MCP & skill (unofficial)

airbnb.com.sg as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by airbnb.com.sg.

| Tool | What it does |
|---|---|
| `airbnb_com_sg__get_s_homes` | Airbnb search: stays in a location |
| `airbnb_com_sg__read_page` | Read a airbnb.com.sg page by checkin |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/airbnb.com.sg`

```sh
claude mcp add --transport http airbnb-com-sg https://unbrowse.ai/mcp/airbnb.com.sg
```

**Skill**: `npx skills add https://unbrowse.ai --skill airbnb-com-sg` (or `npx skills add unbrowse-ai/sites --skill airbnb-com-sg`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/airbnb.com.sg/openapi.json
