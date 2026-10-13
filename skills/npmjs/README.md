# Unbrowse for Npmjs — MCP & skill (unofficial)

npmjs.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by npmjs.com.

| Tool | What it does |
|---|---|
| `npmjs_com__get_search_suggestions` | Search npm |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/npmjs.com`

```sh
claude mcp add --transport http npmjs https://unbrowse.ai/mcp/npmjs.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill npmjs` (or `npx skills add unbrowse-ai/sites --skill npmjs`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/npmjs.com/openapi.json
