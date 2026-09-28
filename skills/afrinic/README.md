# Unbrowse for Afrinic — MCP & skill (unofficial)

afrinic.net as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by afrinic.net.

| Tool | What it does |
|---|---|
| `rdap_afrinic_net__get_ip_196_1_0_0` | Query AFRINIC RDAP for an IP address |
| `afrinic_net__read_page` | Read a page on afrinic.net |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/afrinic.net`

```sh
claude mcp add --transport http afrinic https://unbrowse.ai/mcp/afrinic.net
```

**Skill**: `npx skills add https://unbrowse.ai --skill afrinic` (or `npx skills add unbrowse-ai/sites --skill afrinic`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/afrinic.net/openapi.json
