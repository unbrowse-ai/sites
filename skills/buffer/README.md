# Unbrowse for Buffer — MCP & skill (unofficial)

buffer.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by buffer.com.

| Tool | What it does |
|---|---|
| `buffer_com__get_resources_guides_courses` | Read a Buffer blog article |
| `buffer_com__read_page` | Read a page on buffer.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/buffer.com`

```sh
claude mcp add --transport http buffer https://unbrowse.ai/mcp/buffer.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill buffer` (or `npx skills add unbrowse-ai/sites --skill buffer`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/buffer.com/openapi.json
