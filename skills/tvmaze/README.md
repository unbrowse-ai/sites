# Unbrowse for Tvmaze — MCP & skill (unofficial)

tvmaze.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by tvmaze.com.

| Tool | What it does |
|---|---|
| `tvmaze_com__get_search` | Search tvmaze |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/tvmaze.com`

```sh
claude mcp add --transport http tvmaze https://unbrowse.ai/mcp/tvmaze.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill tvmaze` (or `npx skills add unbrowse-ai/sites --skill tvmaze`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/tvmaze.com/openapi.json
