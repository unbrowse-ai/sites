# Unbrowse for Lazada — MCP & skill (unofficial)

lazada.sg as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by lazada.sg.

| Tool | What it does |
|---|---|
| `lazada_sg__get_catalog` | Search Lazada product listings |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/lazada.sg`

```sh
claude mcp add --transport http lazada-sg https://unbrowse.ai/mcp/lazada.sg
```

**Skill**: `npx skills add https://unbrowse.ai --skill lazada-sg` (or `npx skills add unbrowse-ai/sites --skill lazada-sg`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/lazada.sg/openapi.json
