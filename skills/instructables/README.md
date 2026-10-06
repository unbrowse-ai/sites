# Unbrowse for Instructables — MCP & skill (unofficial)

instructables.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by instructables.com.

| Tool | What it does |
|---|---|
| `instructables_com__get_documents_search` | Search instructables |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/instructables.com`

```sh
claude mcp add --transport http instructables https://unbrowse.ai/mcp/instructables.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill instructables` (or `npx skills add unbrowse-ai/sites --skill instructables`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/instructables.com/openapi.json
