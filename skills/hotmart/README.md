# Unbrowse for Hotmart — MCP & skill (unofficial)

hotmart.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by hotmart.com.

| Tool | What it does |
|---|---|
| `hotmart_com__get_product_groupby` | Browse products by category on Hotmart marketplace |
| `hotmart_com__get_canva_pack_marketing_digital_7_b4_7_d` | Search products on Hotmart marketplace |
| `hotmart_com__read_page` | Read a page on hotmart.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/hotmart.com`

```sh
claude mcp add --transport http hotmart https://unbrowse.ai/mcp/hotmart.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill hotmart` (or `npx skills add unbrowse-ai/sites --skill hotmart`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/hotmart.com/openapi.json
