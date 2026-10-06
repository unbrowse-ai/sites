# Unbrowse for Openlibrary — MCP & skill (unofficial)

openlibrary.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by openlibrary.org.

| Tool | What it does |
|---|---|
| `openlibrary_org__get_search` | Search openlibrary |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/openlibrary.org`

```sh
claude mcp add --transport http openlibrary https://unbrowse.ai/mcp/openlibrary.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill openlibrary` (or `npx skills add unbrowse-ai/sites --skill openlibrary`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/openlibrary.org/openapi.json
