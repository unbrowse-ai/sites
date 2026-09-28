# Unbrowse for Kaspersky — MCP & skill (unofficial)

kaspersky.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by kaspersky.com.

| Tool | What it does |
|---|---|
| `kaspersky_com__get_search_search` | Search kaspersky.com |
| `kaspersky_com__read_page` | Read a page on kaspersky.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/kaspersky.com`

```sh
claude mcp add --transport http kaspersky https://unbrowse.ai/mcp/kaspersky.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill kaspersky` (or `npx skills add unbrowse-ai/sites --skill kaspersky`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/kaspersky.com/openapi.json
