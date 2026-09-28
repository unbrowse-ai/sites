# Unbrowse for Gaijin — MCP & skill (unofficial)

gaijin.net as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by gaijin.net.

| Tool | What it does |
|---|---|
| `store_gaijin_net__get_story_php` | Open a product details page on Gaijin.Net Store |
| `store_gaijin_net__get_search_php` | Search products on Gaijin.Net Store |
| `store_gaijin_net__get_storefront_php` | Browse store category by game on Gaijin.Net Store |
| `gaijin_net__read_page` | Read a page on gaijin.net |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/gaijin.net`

```sh
claude mcp add --transport http gaijin https://unbrowse.ai/mcp/gaijin.net
```

**Skill**: `npx skills add https://unbrowse.ai --skill gaijin` (or `npx skills add unbrowse-ai/sites --skill gaijin`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/gaijin.net/openapi.json
