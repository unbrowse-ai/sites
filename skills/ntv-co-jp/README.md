# Unbrowse for Ntv — MCP & skill (unofficial)

ntv.co.jp as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by ntv.co.jp.

| Tool | What it does |
|---|---|
| `ntv_co_jp__get_programs_programs_json` | Browse drama programs on NTV |
| `ntv_co_jp__render_page` | Search NTV programs and articles by keyword |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/ntv.co.jp`

```sh
claude mcp add --transport http ntv-co-jp https://unbrowse.ai/mcp/ntv.co.jp
```

**Skill**: `npx skills add https://unbrowse.ai --skill ntv-co-jp` (or `npx skills add unbrowse-ai/sites --skill ntv-co-jp`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/ntv.co.jp/openapi.json
