# Unbrowse for Fastly — MCP & skill (unofficial)

fastly.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by fastly.com.

| Tool | What it does |
|---|---|
| `fastly_com__get_public_search_marketing` | Search fastly.net |
| `fastly_com__read_page` | Read a page on fastly.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/fastly.com`

```sh
claude mcp add --transport http fastly https://unbrowse.ai/mcp/fastly.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill fastly` (or `npx skills add unbrowse-ai/sites --skill fastly`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/fastly.com/openapi.json
