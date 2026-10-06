# Unbrowse for Metacpan — MCP & skill (unofficial)

metacpan.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by metacpan.org.

| Tool | What it does |
|---|---|
| `metacpan_org__get_search` | Search metacpan |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/metacpan.org`

```sh
claude mcp add --transport http metacpan https://unbrowse.ai/mcp/metacpan.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill metacpan` (or `npx skills add unbrowse-ai/sites --skill metacpan`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/metacpan.org/openapi.json
