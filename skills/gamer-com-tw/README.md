# Unbrowse for Gamer — MCP & skill (unofficial)

gamer.com.tw as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by gamer.com.tw.

| Tool | What it does |
|---|---|
| `forum_gamer_com_tw__get_b_php` | Browse a forum board |
| `gnn_gamer_com_tw__get_detail_php` | Read a news article |
| `gnn_gamer_com_tw__read_page` | Browse latest news |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/gamer.com.tw`

```sh
claude mcp add --transport http gamer-com-tw https://unbrowse.ai/mcp/gamer.com.tw
```

**Skill**: `npx skills add https://unbrowse.ai --skill gamer-com-tw` (or `npx skills add unbrowse-ai/sites --skill gamer-com-tw`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/gamer.com.tw/openapi.json
