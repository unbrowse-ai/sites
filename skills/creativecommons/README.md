# Unbrowse for Creativecommons — MCP & skill (unofficial)

creativecommons.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by creativecommons.org.

| Tool | What it does |
|---|---|
| `creativecommons_org__get_root` | Search creativecommons.org |
| `creativecommons_org__read_page` | Read a page on creativecommons.org |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/creativecommons.org`

```sh
claude mcp add --transport http creativecommons https://unbrowse.ai/mcp/creativecommons.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill creativecommons` (or `npx skills add unbrowse-ai/sites --skill creativecommons`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/creativecommons.org/openapi.json
