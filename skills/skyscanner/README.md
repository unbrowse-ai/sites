# Unbrowse for Skyscanner — MCP & skill (unofficial)

skyscanner.net as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by skyscanner.net.

| Tool | What it does |
|---|---|
| `skyscanner_net__post_radar_web_unified_search` | Search flights: enter origin, destination, dates and travellers, then submit to |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/skyscanner.net`

```sh
claude mcp add --transport http skyscanner https://unbrowse.ai/mcp/skyscanner.net
```

**Skill**: `npx skills add https://unbrowse.ai --skill skyscanner` (or `npx skills add unbrowse-ai/sites --skill skyscanner`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/skyscanner.net/openapi.json
