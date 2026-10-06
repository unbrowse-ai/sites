# Unbrowse for Alibaba — MCP & skill (unofficial)

alibaba.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by alibaba.com.

| Tool | What it does |
|---|---|
| `alibaba_com__get_trade_search` | Search products by keyword |
| `alibaba_com__render_page` | Search alibaba.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/alibaba.com`

```sh
claude mcp add --transport http alibaba https://unbrowse.ai/mcp/alibaba.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill alibaba` (or `npx skills add unbrowse-ai/sites --skill alibaba`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/alibaba.com/openapi.json
