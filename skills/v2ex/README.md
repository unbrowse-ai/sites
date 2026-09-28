# Unbrowse for V2ex — MCP & skill (unofficial)

v2ex.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by v2ex.com.

| Tool | What it does |
|---|---|
| `v2ex_com__render_page` | Search v2ex.com |
| `v2ex_com__read_page` | Read a page on v2ex.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/v2ex.com`

```sh
claude mcp add --transport http v2ex https://unbrowse.ai/mcp/v2ex.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill v2ex` (or `npx skills add unbrowse-ai/sites --skill v2ex`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/v2ex.com/openapi.json
