# Unbrowse for Liftoff — MCP & skill (unofficial)

liftoff.ai as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by liftoff.ai.

| Tool | What it does |
|---|---|
| `liftoff_ai__get_search` | Search liftoff.ai |
| `liftoff_ai__read_page` | Read a page on liftoff.ai |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/liftoff.ai`

```sh
claude mcp add --transport http liftoff https://unbrowse.ai/mcp/liftoff.ai
```

**Skill**: `npx skills add https://unbrowse.ai --skill liftoff` (or `npx skills add unbrowse-ai/sites --skill liftoff`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/liftoff.ai/openapi.json
