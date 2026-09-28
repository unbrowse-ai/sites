# Unbrowse for Matomo — MCP & skill (unofficial)

matomo.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by matomo.org.

| Tool | What it does |
|---|---|
| `matomo_org__get_search` | Search matomo.org |
| `matomo_org__get_root` | Search the site |
| `matomo_org__read_page` | Read a page on matomo.org |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/matomo.org`

```sh
claude mcp add --transport http matomo https://unbrowse.ai/mcp/matomo.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill matomo` (or `npx skills add unbrowse-ai/sites --skill matomo`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/matomo.org/openapi.json
