# Unbrowse for Bing — MCP & skill (unofficial)

bing.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by bing.com.

| Tool | What it does |
|---|---|
| `bing_com__get_as_suggestions` | Search bing |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/bing.com`

```sh
claude mcp add --transport http bing https://unbrowse.ai/mcp/bing.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill bing` (or `npx skills add unbrowse-ai/sites --skill bing`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/bing.com/openapi.json
