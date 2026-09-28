# Unbrowse for Kompas — MCP & skill (unofficial)

kompas.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by kompas.com.

| Tool | What it does |
|---|---|
| `kompas_com__get_search` | Search news |
| `kompas_com__get_list` | Open an article page |
| `kompas_com__read_page` | Browse category listing |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/kompas.com`

```sh
claude mcp add --transport http kompas https://unbrowse.ai/mcp/kompas.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill kompas` (or `npx skills add unbrowse-ai/sites --skill kompas`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/kompas.com/openapi.json
