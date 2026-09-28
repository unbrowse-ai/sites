# Unbrowse for Malaysiakini — MCP & skill (unofficial)

malaysiakini.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by malaysiakini.com.

| Tool | What it does |
|---|---|
| `malaysiakini_com__get_en_search` | Search m.malaysiakini.com |
| `malaysiakini_com__read_page` | Read a page on malaysiakini.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/malaysiakini.com`

```sh
claude mcp add --transport http malaysiakini https://unbrowse.ai/mcp/malaysiakini.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill malaysiakini` (or `npx skills add unbrowse-ai/sites --skill malaysiakini`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/malaysiakini.com/openapi.json
