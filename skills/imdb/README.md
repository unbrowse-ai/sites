# Unbrowse for Imdb — MCP & skill (unofficial)

imdb.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by imdb.com.

| Tool | What it does |
|---|---|
| `imdb_com__get_find` | Search imdb |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/imdb.com`

```sh
claude mcp add --transport http imdb https://unbrowse.ai/mcp/imdb.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill imdb` (or `npx skills add unbrowse-ai/sites --skill imdb`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/imdb.com/openapi.json
