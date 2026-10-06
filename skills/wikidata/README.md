# Unbrowse for Wikidata — MCP & skill (unofficial)

wikidata.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by wikidata.org.

| Tool | What it does |
|---|---|
| `wikidata_org__get_w_3` | Search wikidata |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/wikidata.org`

```sh
claude mcp add --transport http wikidata https://unbrowse.ai/mcp/wikidata.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill wikidata` (or `npx skills add unbrowse-ai/sites --skill wikidata`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/wikidata.org/openapi.json
