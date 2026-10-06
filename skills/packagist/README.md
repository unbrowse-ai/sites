# Unbrowse for Packagist — MCP & skill (unofficial)

packagist.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by packagist.org.

| Tool | What it does |
|---|---|
| `packagist_org__render_page` | Search packagist |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/packagist.org`

```sh
claude mcp add --transport http packagist https://unbrowse.ai/mcp/packagist.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill packagist` (or `npx skills add unbrowse-ai/sites --skill packagist`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/packagist.org/openapi.json
