# Unbrowse for Apnic — MCP & skill (unofficial)

apnic.net as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by apnic.net.

| Tool | What it does |
|---|---|
| `apnic_net__get_query` | APNIC Whois lookup |
| `apnic_net__read_page` | Read a page on apnic.net |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/apnic.net`

```sh
claude mcp add --transport http apnic https://unbrowse.ai/mcp/apnic.net
```

**Skill**: `npx skills add https://unbrowse.ai --skill apnic` (or `npx skills add unbrowse-ai/sites --skill apnic`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/apnic.net/openapi.json
