# Unbrowse for Wikipedia — MCP & skill (unofficial)

wikipedia.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by wikipedia.org.

| Tool | What it does |
|---|---|
| `en_wikipedia_org__render_page` | Search wikipedia |
| `simple_wikipedia_org__read_page` | Read a Wikipedia article |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/wikipedia.org`

```sh
claude mcp add --transport http wikipedia https://unbrowse.ai/mcp/wikipedia.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill wikipedia` (or `npx skills add unbrowse-ai/sites --skill wikipedia`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/wikipedia.org/openapi.json
