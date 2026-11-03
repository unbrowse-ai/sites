# Unbrowse for Datos — MCP & skill (unofficial)

datos.gob.ar as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by datos.gob.ar.

| Tool | What it does |
|---|---|
| `datos_gob_ar__get_dataset` | Datos Argentina dataset search |
| `datos_gob_ar__read_page` | Sistema de Contrataciones dataset page |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/datos.gob.ar`

```sh
claude mcp add --transport http datos-gob-ar https://unbrowse.ai/mcp/datos.gob.ar
```

**Skill**: `npx skills add https://unbrowse.ai --skill datos-gob-ar` (or `npx skills add unbrowse-ai/sites --skill datos-gob-ar`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/datos.gob.ar/openapi.json
