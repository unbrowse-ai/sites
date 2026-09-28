# Unbrowse for Clickup — MCP & skill (unofficial)

clickup.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by clickup.com.

| Tool | What it does |
|---|---|
| `clickup_com__get_templates_search_2` | Search templates |
| `clickup_com__get_uploads_cu_recent_posts_json` | View product comparison |
| `clickup_com__read_page` | Read a page on clickup.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/clickup.com`

```sh
claude mcp add --transport http clickup https://unbrowse.ai/mcp/clickup.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill clickup` (or `npx skills add unbrowse-ai/sites --skill clickup`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/clickup.com/openapi.json
