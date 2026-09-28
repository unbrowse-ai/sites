# Unbrowse for Aepd — MCP & skill (unofficial)

aepd.es as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by aepd.es.

| Tool | What it does |
|---|---|
| `aepd_es__get_buscador` | Search AEPD publications and resolutions |
| `aepd_es__get_preguntas_frecuentes_buscador` | Search AEPD frequently asked questions |
| `aepd_es__read_page` | Read a page on aepd.es |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/aepd.es`

```sh
claude mcp add --transport http aepd-es https://unbrowse.ai/mcp/aepd.es
```

**Skill**: `npx skills add https://unbrowse.ai --skill aepd-es` (or `npx skills add unbrowse-ai/sites --skill aepd-es`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/aepd.es/openapi.json
