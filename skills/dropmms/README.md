# Unbrowse for Dropmms — MCP & skill (unofficial)

dropmms.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by dropmms.com.

| Tool | What it does |
|---|---|
| `dropmms_com__get_search` | Search dropmms.com |
| `dropmms_com__read_page` | Read a page on dropmms.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/dropmms.com`

```sh
claude mcp add --transport http dropmms https://unbrowse.ai/mcp/dropmms.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill dropmms` (or `npx skills add unbrowse-ai/sites --skill dropmms`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/dropmms.com/openapi.json
