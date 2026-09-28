# Unbrowse for Univie — MCP & skill (unofficial)

univie.ac.at as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by univie.ac.at.

| Tool | What it does |
|---|---|
| `ufind_univie_ac_at__get_search` | Search ufind.univie.ac.at |
| `univie_ac_at__get_suche` | Search the website |
| `univie_ac_at__read_page` | Read a page on univie.ac.at |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/univie.ac.at`

```sh
claude mcp add --transport http univie-ac-at https://unbrowse.ai/mcp/univie.ac.at
```

**Skill**: `npx skills add https://unbrowse.ai --skill univie-ac-at` (or `npx skills add unbrowse-ai/sites --skill univie-ac-at`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/univie.ac.at/openapi.json
