# Unbrowse for Redfin — MCP & skill (unofficial)

redfin.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by redfin.com.

| Tool | What it does |
|---|---|
| `redfin_com__get_stingray_gis` | Redfin search: homes for sale in a region |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/redfin.com`

```sh
claude mcp add --transport http redfin https://unbrowse.ai/mcp/redfin.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill redfin` (or `npx skills add unbrowse-ai/sites --skill redfin`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/redfin.com/openapi.json
