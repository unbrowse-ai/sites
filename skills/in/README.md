# Unbrowse for In — MCP & skill (unofficial)

in.net as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by in.net.

| Tool | What it does |
|---|---|
| `bokepsin_in_net__get_search` | Search bokepsin.in.net |
| `avtub_in_net__get_search` | Search avtub.in.net |
| `bokepsin_in_net__read_page` | Read a page on bokepsin.in.net |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/in.net`

```sh
claude mcp add --transport http in https://unbrowse.ai/mcp/in.net
```

**Skill**: `npx skills add https://unbrowse.ai --skill in` (or `npx skills add unbrowse-ai/sites --skill in`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/in.net/openapi.json
