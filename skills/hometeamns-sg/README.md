# Unbrowse for Hometeamns — MCP & skill (unofficial)

hometeamns.sg as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by hometeamns.sg.

| Tool | What it does |
|---|---|
| `hometeamns_sg__get_search` | Search hometeamns.sg |
| `hometeamns_sg__read_page` | Read a page on hometeamns.sg |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/hometeamns.sg`

```sh
claude mcp add --transport http hometeamns-sg https://unbrowse.ai/mcp/hometeamns.sg
```

**Skill**: `npx skills add https://unbrowse.ai --skill hometeamns-sg` (or `npx skills add unbrowse-ai/sites --skill hometeamns-sg`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/hometeamns.sg/openapi.json
