# Unbrowse for Milelion — MCP & skill (unofficial)

milelion.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by milelion.com.

| Tool | What it does |
|---|---|
| `milelion_com__get_search` | Search milelion.com |
| `milelion_com__read_page` | Read a page on milelion.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/milelion.com`

```sh
claude mcp add --transport http milelion https://unbrowse.ai/mcp/milelion.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill milelion` (or `npx skills add unbrowse-ai/sites --skill milelion`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/milelion.com/openapi.json
