# Unbrowse for Pypi — MCP & skill (unofficial)

pypi.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by pypi.org.

| Tool | What it does |
|---|---|
| `pypi_org__get_search` | Search pypi |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/pypi.org`

```sh
claude mcp add --transport http pypi https://unbrowse.ai/mcp/pypi.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill pypi` (or `npx skills add unbrowse-ai/sites --skill pypi`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/pypi.org/openapi.json
