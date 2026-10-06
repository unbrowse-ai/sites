# Unbrowse for Archive — MCP & skill (unofficial)

archive.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by archive.org.

| Tool | What it does |
|---|---|
| `archive_org__get_search_anchor` | Search archive |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/archive.org`

```sh
claude mcp add --transport http archive https://unbrowse.ai/mcp/archive.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill archive` (or `npx skills add unbrowse-ai/sites --skill archive`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/archive.org/openapi.json
