# Unbrowse for Usitc — MCP & skill (unofficial)

usitc.gov as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by usitc.gov.

| Tool | What it does |
|---|---|
| `hts_usitc_gov__get_reststop_search` | Search HTS codes by keyword |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/usitc.gov`

```sh
claude mcp add --transport http usitc https://unbrowse.ai/mcp/usitc.gov
```

**Skill**: `npx skills add https://unbrowse.ai --skill usitc` (or `npx skills add unbrowse-ai/sites --skill usitc`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/usitc.gov/openapi.json
