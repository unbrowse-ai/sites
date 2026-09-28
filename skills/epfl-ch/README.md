# Unbrowse for Epfl — MCP & skill (unofficial)

epfl.ch as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by epfl.ch.

| Tool | What it does |
|---|---|
| `epfl_ch__render_page` | Search the EPFL website |
| `epfl_ch__read_page` | Read a page on epfl.ch |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/epfl.ch`

```sh
claude mcp add --transport http epfl-ch https://unbrowse.ai/mcp/epfl.ch
```

**Skill**: `npx skills add https://unbrowse.ai --skill epfl-ch` (or `npx skills add unbrowse-ai/sites --skill epfl-ch`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/epfl.ch/openapi.json
