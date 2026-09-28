# Unbrowse for Rottentomatoes — MCP & skill (unofficial)

rottentomatoes.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by rottentomatoes.com.

| Tool | What it does |
|---|---|
| `rottentomatoes_com__get_cnapi_videos` | Open a movie detail page |
| `rottentomatoes_com__get_search` | Search movies and TV shows |
| `rottentomatoes_com__read_page` | Read a page on rottentomatoes.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/rottentomatoes.com`

```sh
claude mcp add --transport http rottentomatoes https://unbrowse.ai/mcp/rottentomatoes.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill rottentomatoes` (or `npx skills add unbrowse-ai/sites --skill rottentomatoes`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/rottentomatoes.com/openapi.json
