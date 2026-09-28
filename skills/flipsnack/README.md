# Unbrowse for Flipsnack — MCP & skill (unofficial)

flipsnack.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by flipsnack.com.

| Tool | What it does |
|---|---|
| `flipsnack_com__get_templates_related` | Open a flipsnack template page |
| `flipsnack_com__get_templates_search` | Search flipsnack templates |
| `flipsnack_com__read_page` | Read a page on flipsnack.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/flipsnack.com`

```sh
claude mcp add --transport http flipsnack https://unbrowse.ai/mcp/flipsnack.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill flipsnack` (or `npx skills add unbrowse-ai/sites --skill flipsnack`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/flipsnack.com/openapi.json
