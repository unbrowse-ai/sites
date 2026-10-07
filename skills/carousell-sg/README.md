# Unbrowse for Carousell — MCP & skill (unofficial)

carousell.sg as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by carousell.sg.

| Tool | What it does |
|---|---|
| `carousell_sg__get_search_macbook_air` | Search listings by query with max price and sort order |
| `carousell_sg__read_page` | Search Carousell listings |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/carousell.sg`

```sh
claude mcp add --transport http carousell-sg https://unbrowse.ai/mcp/carousell.sg
```

**Skill**: `npx skills add https://unbrowse.ai --skill carousell-sg` (or `npx skills add unbrowse-ai/sites --skill carousell-sg`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/carousell.sg/openapi.json
