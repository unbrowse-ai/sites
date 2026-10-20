# Unbrowse for Uneed — MCP & skill (unofficial)

uneed.best as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by uneed.best.

| Tool | What it does |
|---|---|
| `uneed_best__get_tools_search` | Search products |
| `uneed_best__get_posts` | Read the latest product launches |
| `uneed_best__read_page` | Read a uneed.best tool page |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/uneed.best`

```sh
claude mcp add --transport http uneed-best https://unbrowse.ai/mcp/uneed.best
```

**Skill**: `npx skills add https://unbrowse.ai --skill uneed-best` (or `npx skills add unbrowse-ai/sites --skill uneed-best`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/uneed.best/openapi.json
