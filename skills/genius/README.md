# Unbrowse for Genius — MCP & skill (unofficial)

genius.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by genius.com.

| Tool | What it does |
|---|---|
| `genius_com__get_search_multi` | Search genius |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/genius.com`

```sh
claude mcp add --transport http genius https://unbrowse.ai/mcp/genius.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill genius` (or `npx skills add unbrowse-ai/sites --skill genius`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/genius.com/openapi.json
