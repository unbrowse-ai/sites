# Unbrowse for Manhuaplus — MCP & skill (unofficial)

manhuaplus.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by manhuaplus.org.

| Tool | What it does |
|---|---|
| `manhuaplus_org__get_search` | Search manhuaplus.org |
| `manhuaplus_org__read_page` | Read a page on manhuaplus.org |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/manhuaplus.org`

```sh
claude mcp add --transport http manhuaplus https://unbrowse.ai/mcp/manhuaplus.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill manhuaplus` (or `npx skills add unbrowse-ai/sites --skill manhuaplus`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/manhuaplus.org/openapi.json
