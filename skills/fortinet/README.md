# Unbrowse for Fortinet — MCP & skill (unofficial)

fortinet.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by fortinet.com.

| Tool | What it does |
|---|---|
| `fortinet_com__render_page` | Search the Fortinet site |
| `fortinet_com__read_page` | Read a fortinet.com page by name |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/fortinet.com`

```sh
claude mcp add --transport http fortinet https://unbrowse.ai/mcp/fortinet.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill fortinet` (or `npx skills add unbrowse-ai/sites --skill fortinet`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/fortinet.com/openapi.json
