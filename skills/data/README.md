# Unbrowse for Data — MCP & skill (unofficial)

data.gov as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by data.gov.

| Tool | What it does |
|---|---|
| `catalog_data_gov__get_root` | Search datagov |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/data.gov`

```sh
claude mcp add --transport http data https://unbrowse.ai/mcp/data.gov
```

**Skill**: `npx skills add https://unbrowse.ai --skill data` (or `npx skills add unbrowse-ai/sites --skill data`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/data.gov/openapi.json
