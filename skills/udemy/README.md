# Unbrowse for Udemy — MCP & skill (unofficial)

udemy.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by udemy.com.

| Tool | What it does |
|---|---|
| `udemy_com__read_course_by_name` | Read a udemy.com page by name |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/udemy.com`

```sh
claude mcp add --transport http udemy https://unbrowse.ai/mcp/udemy.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill udemy` (or `npx skills add unbrowse-ai/sites --skill udemy`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/udemy.com/openapi.json
