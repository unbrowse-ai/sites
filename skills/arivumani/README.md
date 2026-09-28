# Unbrowse for Arivumani — MCP & skill (unofficial)

arivumani.net as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by arivumani.net.

| Tool | What it does |
|---|---|
| `arivumani_net__get_search` | Search arivumani.net |
| `arivumani_net__read_page` | Read a page on arivumani.net |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/arivumani.net`

```sh
claude mcp add --transport http arivumani https://unbrowse.ai/mcp/arivumani.net
```

**Skill**: `npx skills add https://unbrowse.ai --skill arivumani` (or `npx skills add unbrowse-ai/sites --skill arivumani`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/arivumani.net/openapi.json
