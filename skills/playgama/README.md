# Unbrowse for Playgama — MCP & skill (unofficial)

playgama.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by playgama.com.

| Tool | What it does |
|---|---|
| `playgama_com__get_search` | Search playgama.com |
| `playgama_com__read_page` | Read a page on playgama.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/playgama.com`

```sh
claude mcp add --transport http playgama https://unbrowse.ai/mcp/playgama.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill playgama` (or `npx skills add unbrowse-ai/sites --skill playgama`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/playgama.com/openapi.json
