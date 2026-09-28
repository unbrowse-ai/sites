# Unbrowse for Ndr — MCP & skill (unofficial)

ndr.de as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by ndr.de.

| Tool | What it does |
|---|---|
| `ndr_de__get_search` | Search ndr.de |
| `ndr_de__get_suche` | Search NDR website |
| `ndr_de__read_page` | Read a page on ndr.de |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/ndr.de`

```sh
claude mcp add --transport http ndr-de https://unbrowse.ai/mcp/ndr.de
```

**Skill**: `npx skills add https://unbrowse.ai --skill ndr-de` (or `npx skills add unbrowse-ai/sites --skill ndr-de`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/ndr.de/openapi.json
