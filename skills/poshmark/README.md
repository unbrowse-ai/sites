# Unbrowse for Poshmark — MCP & skill (unofficial)

poshmark.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by poshmark.com.

| Tool | What it does |
|---|---|
| `poshmark_com__get_search` | Search marketplace listings by keyword |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/poshmark.com`

```sh
claude mcp add --transport http poshmark https://unbrowse.ai/mcp/poshmark.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill poshmark` (or `npx skills add unbrowse-ai/sites --skill poshmark`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/poshmark.com/openapi.json
