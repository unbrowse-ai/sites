# Unbrowse for Bbcgoodfood — MCP & skill (unofficial)

bbcgoodfood.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by bbcgoodfood.com.

| Tool | What it does |
|---|---|
| `bbcgoodfood_com__get_search_results` | Search bbcgoodfood |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/bbcgoodfood.com`

```sh
claude mcp add --transport http bbcgoodfood https://unbrowse.ai/mcp/bbcgoodfood.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill bbcgoodfood` (or `npx skills add unbrowse-ai/sites --skill bbcgoodfood`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/bbcgoodfood.com/openapi.json
