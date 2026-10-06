# Unbrowse for Python — MCP & skill (unofficial)

python.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by python.org.

| Tool | What it does |
|---|---|
| `docs_python_org__render_page` | Search pythondocs |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/python.org`

```sh
claude mcp add --transport http python https://unbrowse.ai/mcp/python.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill python` (or `npx skills add unbrowse-ai/sites --skill python`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/python.org/openapi.json
