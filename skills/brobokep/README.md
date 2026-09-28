# Unbrowse for Brobokep — MCP & skill (unofficial)

brobokep.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by brobokep.org.

| Tool | What it does |
|---|---|
| `brobokep_org__get_search` | Search brobokep.org |
| `brobokep_org__read_page` | Read a page on brobokep.org |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/brobokep.org`

```sh
claude mcp add --transport http brobokep https://unbrowse.ai/mcp/brobokep.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill brobokep` (or `npx skills add unbrowse-ai/sites --skill brobokep`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/brobokep.org/openapi.json
