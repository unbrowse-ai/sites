# Unbrowse for Barracuda — MCP & skill (unofficial)

barracuda.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by barracuda.com.

| Tool | What it does |
|---|---|
| `barracuda_com__get_root` | Search the site |
| `barracuda_com__get_iframe_subscribe_blog` | Open a product page |
| `barracuda_com__read_page` | Read a page on barracuda.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/barracuda.com`

```sh
claude mcp add --transport http barracuda https://unbrowse.ai/mcp/barracuda.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill barracuda` (or `npx skills add unbrowse-ai/sites --skill barracuda`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/barracuda.com/openapi.json
