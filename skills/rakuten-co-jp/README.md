# Unbrowse for Rakuten — MCP & skill (unofficial)

rakuten.co.jp as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by rakuten.co.jp.

| Tool | What it does |
|---|---|
| `search_rakuten_co_jp__render_page` | Search Rakuten for PlayStation 5 Pro listings |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/rakuten.co.jp`

```sh
claude mcp add --transport http rakuten-co-jp https://unbrowse.ai/mcp/rakuten.co.jp
```

**Skill**: `npx skills add https://unbrowse.ai --skill rakuten-co-jp` (or `npx skills add unbrowse-ai/sites --skill rakuten-co-jp`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/rakuten.co.jp/openapi.json
