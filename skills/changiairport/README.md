# Unbrowse for Changiairport — MCP & skill (unofficial)

changiairport.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by changiairport.com.

| Tool | What it does |
|---|---|
| `changiairport_com__post_search_all` | Create search all on www.changiairport.com — Changi Airport Departures: Live Flight Status |
| `changiairport_com__get_autocomplete_web` | Search changiairport.com |
| `changiairport_com__post_anonymous` | Changi Airport departures listing |
| `changiairport_com__read_page` | Read a page on changiairport.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/changiairport.com`

```sh
claude mcp add --transport http changiairport https://unbrowse.ai/mcp/changiairport.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill changiairport` (or `npx skills add unbrowse-ai/sites --skill changiairport`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/changiairport.com/openapi.json
