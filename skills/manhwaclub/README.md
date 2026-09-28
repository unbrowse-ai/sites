# Unbrowse for Manhwaclub — MCP & skill (unofficial)

manhwaclub.net as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by manhwaclub.net.

| Tool | What it does |
|---|---|
| `manhwaclub_net__get_search` | Search manhwaclub.net |
| `manhwaclub_net__read_page` | Read a page on manhwaclub.net |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/manhwaclub.net`

```sh
claude mcp add --transport http manhwaclub https://unbrowse.ai/mcp/manhwaclub.net
```

**Skill**: `npx skills add https://unbrowse.ai --skill manhwaclub` (or `npx skills add unbrowse-ai/sites --skill manhwaclub`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/manhwaclub.net/openapi.json
