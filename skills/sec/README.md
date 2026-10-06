# Unbrowse for Sec — MCP & skill (unofficial)

sec.gov as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by sec.gov.

| Tool | What it does |
|---|---|
| `sec_gov__get_latest_search_index` | Search SEC EDGAR full-text filings |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/sec.gov`

```sh
claude mcp add --transport http sec https://unbrowse.ai/mcp/sec.gov
```

**Skill**: `npx skills add https://unbrowse.ai --skill sec` (or `npx skills add unbrowse-ai/sites --skill sec`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/sec.gov/openapi.json
