# Unbrowse for Discogs — MCP & skill (unofficial)

discogs.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by discogs.com.

| Tool | What it does |
|---|---|
| `discogs_com__get_search` | Search discogs |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/discogs.com`

```sh
claude mcp add --transport http discogs https://unbrowse.ai/mcp/discogs.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill discogs` (or `npx skills add unbrowse-ai/sites --skill discogs`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/discogs.com/openapi.json
