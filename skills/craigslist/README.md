# Unbrowse for Craigslist — MCP & skill (unofficial)

craigslist.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by craigslist.org.

| Tool | What it does |
|---|---|
| `sapi_craigslist_org__get_search_full` | Craigslist search: posts in a city and category |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/craigslist.org`

```sh
claude mcp add --transport http craigslist https://unbrowse.ai/mcp/craigslist.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill craigslist` (or `npx skills add unbrowse-ai/sites --skill craigslist`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/craigslist.org/openapi.json
