# Unbrowse for Telekom — MCP & skill (unofficial)

telekom.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by telekom.com.

| Tool | What it does |
|---|---|
| `telekom_com__get_en_search_search_json` | Search telekom.net |
| `telekom_com__read_page` | Read a page on telekom.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/telekom.com`

```sh
claude mcp add --transport http telekom https://unbrowse.ai/mcp/telekom.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill telekom` (or `npx skills add unbrowse-ai/sites --skill telekom`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/telekom.com/openapi.json
