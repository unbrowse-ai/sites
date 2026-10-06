# Unbrowse for Rubygems — MCP & skill (unofficial)

rubygems.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by rubygems.org.

| Tool | What it does |
|---|---|
| `rubygems_org__get_search` | Search rubygems |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/rubygems.org`

```sh
claude mcp add --transport http rubygems https://unbrowse.ai/mcp/rubygems.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill rubygems` (or `npx skills add unbrowse-ai/sites --skill rubygems`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/rubygems.org/openapi.json
