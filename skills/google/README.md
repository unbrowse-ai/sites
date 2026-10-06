# Unbrowse for Google — MCP & skill (unofficial)

google.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by google.com.

| Tool | What it does |
|---|---|
| `news_google_com__get_rss_search` | Google News search (RSS) |
| `google_com__read_page` | Read google.com/travel/flights |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/google.com`

```sh
claude mcp add --transport http google https://unbrowse.ai/mcp/google.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill google` (or `npx skills add unbrowse-ai/sites --skill google`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/google.com/openapi.json
