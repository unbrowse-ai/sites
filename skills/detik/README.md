# Unbrowse for Detik — MCP & skill (unofficial)

detik.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by detik.com.

| Tool | What it does |
|---|---|
| `detik_com__post_anonymous` | Create anonymous on detik.com — detikcom - Informasi Berita Terkini dan Terbaru Hari Ini |
| `detik_com__get_search_searchall` | Search news on detik |
| `detik_com__get_search` | Search detik.com |
| `detik_com__read_page` | Read a page on detik.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/detik.com`

```sh
claude mcp add --transport http detik https://unbrowse.ai/mcp/detik.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill detik` (or `npx skills add unbrowse-ai/sites --skill detik`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/detik.com/openapi.json
