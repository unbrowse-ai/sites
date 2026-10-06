# Unbrowse for Singtel — MCP & skill (unofficial)

singtel.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by singtel.com.

| Tool | What it does |
|---|---|
| `shop_singtel_com__get_plans` | Read plans on shop.singtel.com |
| `shop_singtel_com__read_page` | Read shop.singtel.com/plans |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/singtel.com`

```sh
claude mcp add --transport http singtel https://unbrowse.ai/mcp/singtel.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill singtel` (or `npx skills add unbrowse-ai/sites --skill singtel`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/singtel.com/openapi.json
