# Unbrowse for Mariadb — MCP & skill (unofficial)

mariadb.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by mariadb.org.

| Tool | What it does |
|---|---|
| `mariadb_org__get_search` | Search mariadb.org |
| `mariadb_org__read_page` | Read a page on mariadb.org |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/mariadb.org`

```sh
claude mcp add --transport http mariadb https://unbrowse.ai/mcp/mariadb.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill mariadb` (or `npx skills add unbrowse-ai/sites --skill mariadb`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/mariadb.org/openapi.json
