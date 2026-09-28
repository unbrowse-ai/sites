# Unbrowse for Radiofrance — MCP & skill (unofficial)

radiofrance.fr as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by radiofrance.fr.

| Tool | What it does |
|---|---|
| `radiofrance_fr__get_recherche_data_json` | Search Radio France |
| `radiofrance_fr__get_serie_l_epopee_de_lady_liberty_data_json` | Open a podcast page |
| `radiofrance_fr__get_podcasts_data_json` | Browse podcasts by station |
| `radiofrance_fr__read_page` | Read a page on radiofrance.fr |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/radiofrance.fr`

```sh
claude mcp add --transport http radiofrance-fr https://unbrowse.ai/mcp/radiofrance.fr
```

**Skill**: `npx skills add https://unbrowse.ai --skill radiofrance-fr` (or `npx skills add unbrowse-ai/sites --skill radiofrance-fr`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/radiofrance.fr/openapi.json
