# Unbrowse for Airbnb — MCP & skill (unofficial)

airbnb.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by airbnb.com.

| Tool | What it does |
|---|---|
| `airbnb_com__get_s_homes` | Airbnb search: stays in a location |
| `airbnb_com__read_page` | Search stays |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/airbnb.com`

```sh
claude mcp add --transport http airbnb https://unbrowse.ai/mcp/airbnb.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill airbnb` (or `npx skills add unbrowse-ai/sites --skill airbnb`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/airbnb.com/openapi.json
