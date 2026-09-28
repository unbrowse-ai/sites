# Unbrowse for Mydlink — MCP & skill (unofficial)

mydlink.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by mydlink.com.

| Tool | What it does |
|---|---|
| `eu_mydlink_com__get_product_region_xml` | Browse cloud cameras |
| `la_mydlink_com__get_product_region` | List mydlink cloud cameras |
| `in_mydlink_com__get_product_region` | List cloud camera products |
| `la_mydlink_com__read_page` | View mydlink app download links |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/mydlink.com`

```sh
claude mcp add --transport http mydlink https://unbrowse.ai/mcp/mydlink.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill mydlink` (or `npx skills add unbrowse-ai/sites --skill mydlink`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/mydlink.com/openapi.json
