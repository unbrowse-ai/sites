# Unbrowse for Apple — MCP & skill (unofficial)

apple.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by apple.com.

| Tool | What it does |
|---|---|
| `apple_com__render_page` | Search apple.com |
| `apple_com__get_mcm_product_price` | Browse an Apple product category |
| `apple_com__read_page` | Read a page on apple.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/apple.com`

```sh
claude mcp add --transport http apple https://unbrowse.ai/mcp/apple.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill apple` (or `npx skills add unbrowse-ai/sites --skill apple`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/apple.com/openapi.json
