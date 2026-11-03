# Unbrowse for Qq — MCP & skill (unofficial)

qq.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by qq.com.

| Tool | What it does |
|---|---|
| `qq_com__post_pc_search_result` | Search QQ.com - second run |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/qq.com`

```sh
claude mcp add --transport http qq https://unbrowse.ai/mcp/qq.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill qq` (or `npx skills add unbrowse-ai/sites --skill qq`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/qq.com/openapi.json
