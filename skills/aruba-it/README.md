# Unbrowse for Aruba — MCP & skill (unofficial)

aruba.it as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by aruba.it.

| Tool | What it does |
|---|---|
| `aruba_it__get_en` | Browse Aruba hosting plans and pricing |
| `aruba_it__read_page` | Read a page on aruba.it |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/aruba.it`

```sh
claude mcp add --transport http aruba-it https://unbrowse.ai/mcp/aruba.it
```

**Skill**: `npx skills add https://unbrowse.ai --skill aruba-it` (or `npx skills add unbrowse-ai/sites --skill aruba-it`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/aruba.it/openapi.json
