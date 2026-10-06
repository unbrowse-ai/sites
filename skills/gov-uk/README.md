# Unbrowse for Gov — MCP & skill (unofficial)

gov.uk as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by gov.uk.

| Tool | What it does |
|---|---|
| `gov_uk__get_search_all` | Search govuk |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/gov.uk`

```sh
claude mcp add --transport http gov-uk https://unbrowse.ai/mcp/gov.uk
```

**Skill**: `npx skills add https://unbrowse.ai --skill gov-uk` (or `npx skills add unbrowse-ai/sites --skill gov-uk`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/gov.uk/openapi.json
