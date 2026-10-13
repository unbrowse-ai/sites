# Unbrowse for Semanticscholar — MCP & skill (unofficial)

semanticscholar.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by semanticscholar.org.

| Tool | What it does |
|---|---|
| `semanticscholar_org__get_paper_by_id` | Paper detail with citations and references |
| `semanticscholar_org__post_search` | Search semanticscholar |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/semanticscholar.org`

```sh
claude mcp add --transport http semanticscholar https://unbrowse.ai/mcp/semanticscholar.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill semanticscholar` (or `npx skills add unbrowse-ai/sites --skill semanticscholar`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/semanticscholar.org/openapi.json
