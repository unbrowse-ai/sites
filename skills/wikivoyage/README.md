# Unbrowse for Wikivoyage — MCP & skill (unofficial)

wikivoyage.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by wikivoyage.org.

| Tool | What it does |
|---|---|
| `en_wikivoyage_org__render_page` | Search wikivoyage |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/wikivoyage.org`

```sh
claude mcp add --transport http wikivoyage https://unbrowse.ai/mcp/wikivoyage.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill wikivoyage` (or `npx skills add unbrowse-ai/sites --skill wikivoyage`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/wikivoyage.org/openapi.json
