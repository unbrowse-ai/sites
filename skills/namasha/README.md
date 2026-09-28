# Unbrowse for Namasha — MCP & skill (unofficial)

namasha.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by namasha.com.

| Tool | What it does |
|---|---|
| `namasha_com__get_search` | Search namasha.com |
| `namasha_com__render_page` | Search videos on Namasha |
| `namasha_com__read_page` | Read a page on namasha.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/namasha.com`

```sh
claude mcp add --transport http namasha https://unbrowse.ai/mcp/namasha.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill namasha` (or `npx skills add unbrowse-ai/sites --skill namasha`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/namasha.com/openapi.json
