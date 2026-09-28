# Unbrowse for Tenor — MCP & skill (unofficial)

tenor.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by tenor.com.

| Tool | What it does |
|---|---|
| `tenor_com__get_search_suggestions` | Search GIFs |
| `tenor_com__get_search` | Search tenor.com |
| `tenor_com__read_page` | Open a GIF detail page |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/tenor.com`

```sh
claude mcp add --transport http tenor https://unbrowse.ai/mcp/tenor.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill tenor` (or `npx skills add unbrowse-ai/sites --skill tenor`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/tenor.com/openapi.json
