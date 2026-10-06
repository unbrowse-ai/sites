# Unbrowse for Wikimedia — MCP & skill (unofficial)

wikimedia.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by wikimedia.org.

| Tool | What it does |
|---|---|
| `commons_wikimedia_org__render_page` | Search commons |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/wikimedia.org`

```sh
claude mcp add --transport http wikimedia https://unbrowse.ai/mcp/wikimedia.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill wikimedia` (or `npx skills add unbrowse-ai/sites --skill wikimedia`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/wikimedia.org/openapi.json
