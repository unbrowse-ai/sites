# Unbrowse for Faz — MCP & skill (unofficial)

faz.net as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by faz.net.

| Tool | What it does |
|---|---|
| `faz_net__get_suche_search` | Search articles |
| `faz_net__read_page` | Read a page on faz.net |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/faz.net`

```sh
claude mcp add --transport http faz https://unbrowse.ai/mcp/faz.net
```

**Skill**: `npx skills add https://unbrowse.ai --skill faz` (or `npx skills add unbrowse-ai/sites --skill faz`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/faz.net/openapi.json
