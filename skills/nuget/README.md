# Unbrowse for Nuget — MCP & skill (unofficial)

nuget.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by nuget.org.

| Tool | What it does |
|---|---|
| `nuget_org__get_packages` | Search nuget |
| `nuget_org__get_search` | Search nuget.org |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/nuget.org`

```sh
claude mcp add --transport http nuget https://unbrowse.ai/mcp/nuget.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill nuget` (or `npx skills add unbrowse-ai/sites --skill nuget`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/nuget.org/openapi.json
