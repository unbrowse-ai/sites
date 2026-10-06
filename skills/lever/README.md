# Unbrowse for Lever — MCP & skill (unofficial)

lever.co as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by lever.co.

| Tool | What it does |
|---|---|
| `api_lever_co__get_postings_ro` | Lever job board: open postings |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/lever.co`

```sh
claude mcp add --transport http lever https://unbrowse.ai/mcp/lever.co
```

**Skill**: `npx skills add https://unbrowse.ai --skill lever` (or `npx skills add unbrowse-ai/sites --skill lever`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/lever.co/openapi.json
