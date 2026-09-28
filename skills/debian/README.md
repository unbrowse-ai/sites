# Unbrowse for Debian — MCP & skill (unofficial)

debian.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by debian.org.

| Tool | What it does |
|---|---|
| `search_debian_org__get_search` | Search search.debian.org |
| `debian_org__read_page` | Read a page on debian.org |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/debian.org`

```sh
claude mcp add --transport http debian https://unbrowse.ai/mcp/debian.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill debian` (or `npx skills add unbrowse-ai/sites --skill debian`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/debian.org/openapi.json
