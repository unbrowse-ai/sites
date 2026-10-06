# Unbrowse for Greenhouse — MCP & skill (unofficial)

greenhouse.io as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by greenhouse.io.

| Tool | What it does |
|---|---|
| `boards_api_greenhouse_io__get_anthropic_jobs` | Greenhouse job board: open jobs |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/greenhouse.io`

```sh
claude mcp add --transport http greenhouse https://unbrowse.ai/mcp/greenhouse.io
```

**Skill**: `npx skills add https://unbrowse.ai --skill greenhouse` (or `npx skills add unbrowse-ai/sites --skill greenhouse`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/greenhouse.io/openapi.json
