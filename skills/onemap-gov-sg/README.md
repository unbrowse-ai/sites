# Unbrowse for Onemap — MCP & skill (unofficial)

onemap.gov.sg as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by onemap.gov.sg.

| Tool | What it does |
|---|---|
| `onemap_gov_sg__get_ss_search` | Read ss search on www.onemap.gov.sg |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/onemap.gov.sg`

```sh
claude mcp add --transport http onemap-gov-sg https://unbrowse.ai/mcp/onemap.gov.sg
```

**Skill**: `npx skills add https://unbrowse.ai --skill onemap-gov-sg` (or `npx skills add unbrowse-ai/sites --skill onemap-gov-sg`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/onemap.gov.sg/openapi.json
