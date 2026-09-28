# Unbrowse for Abebooks — MCP & skill (unofficial)

abebooks.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by abebooks.com.

| Tool | What it does |
|---|---|
| `abebooks_com__get_servlet_highlight_inventory` | Search abebooks.com |
| `abebooks_com__get_servlet_search_results` | Search books on AbeBooks |
| `abebooks_com__read_page` | Read a page on abebooks.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/abebooks.com`

```sh
claude mcp add --transport http abebooks https://unbrowse.ai/mcp/abebooks.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill abebooks` (or `npx skills add unbrowse-ai/sites --skill abebooks`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/abebooks.com/openapi.json
