# Unbrowse for Crossref — MCP & skill (unofficial)

crossref.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by crossref.org.

| Tool | What it does |
|---|---|
| `search_crossref_org__get_search_works` | Search crossref |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/crossref.org`

```sh
claude mcp add --transport http crossref https://unbrowse.ai/mcp/crossref.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill crossref` (or `npx skills add unbrowse-ai/sites --skill crossref`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/crossref.org/openapi.json
