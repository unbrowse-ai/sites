# Unbrowse for Swr — MCP & skill (unofficial)

swr.de as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by swr.de.

| Tool | What it does |
|---|---|
| `swr_de__get_baden_wuerttemberg` | Open a SWR news article page |
| `swr_de__read_page` | Read a page on swr.de |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/swr.de`

```sh
claude mcp add --transport http swr-de https://unbrowse.ai/mcp/swr.de
```

**Skill**: `npx skills add https://unbrowse.ai --skill swr-de` (or `npx skills add unbrowse-ai/sites --skill swr-de`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/swr.de/openapi.json
