# Unbrowse for Microsoft — MCP & skill (unofficial)

microsoft.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by microsoft.com.

| Tool | What it does |
|---|---|
| `microsoft_com__get_msstoreapiprod_autosuggest` | Search windows.com |
| `microsoft_com__read_page` | Read a page on microsoft.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/microsoft.com`

```sh
claude mcp add --transport http microsoft https://unbrowse.ai/mcp/microsoft.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill microsoft` (or `npx skills add unbrowse-ai/sites --skill microsoft`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/microsoft.com/openapi.json
