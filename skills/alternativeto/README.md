# Unbrowse for Alternativeto — MCP & skill (unofficial)

alternativeto.net as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by alternativeto.net.

| Tool | What it does |
|---|---|
| `alternativeto_net__get_browse_search` | Search software on AlternativeTo |
| `alternativeto_net__post_indexes_queries_2` | Search alternativeto |
| `alternativeto_net__get_items_available_filters` | Browse apps by category |
| `alternativeto_net__render_page` | Search apps and software |
| `alternativeto_net__read_page` | Read a alternativeto.net software page |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/alternativeto.net`

```sh
claude mcp add --transport http alternativeto https://unbrowse.ai/mcp/alternativeto.net
```

**Skill**: `npx skills add https://unbrowse.ai --skill alternativeto` (or `npx skills add unbrowse-ai/sites --skill alternativeto`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/alternativeto.net/openapi.json
