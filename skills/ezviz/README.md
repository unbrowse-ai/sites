# Unbrowse for Ezviz — MCP & skill (unofficial)

ezviz.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by ezviz.com.

| Tool | What it does |
|---|---|
| `ezviz_com__get_search` | Search ezviz.com |
| `ezviz_com__read_page` | Read a page on ezviz.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/ezviz.com`

```sh
claude mcp add --transport http ezviz https://unbrowse.ai/mcp/ezviz.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill ezviz` (or `npx skills add unbrowse-ai/sites --skill ezviz`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/ezviz.com/openapi.json
