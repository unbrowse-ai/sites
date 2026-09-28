# Unbrowse for Mobilefuse — MCP & skill (unofficial)

mobilefuse.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by mobilefuse.com.

| Tool | What it does |
|---|---|
| `mobilefuse_com__render_page` | Search mobilefuse news articles |
| `mobilefuse_com__read_page` | Read a page on mobilefuse.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/mobilefuse.com`

```sh
claude mcp add --transport http mobilefuse https://unbrowse.ai/mcp/mobilefuse.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill mobilefuse` (or `npx skills add unbrowse-ai/sites --skill mobilefuse`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/mobilefuse.com/openapi.json
