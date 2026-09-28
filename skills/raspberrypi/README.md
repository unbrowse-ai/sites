# Unbrowse for Raspberrypi — MCP & skill (unofficial)

raspberrypi.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by raspberrypi.org.

| Tool | What it does |
|---|---|
| `projects_raspberrypi_org__get_projects_search` | Search projects on Raspberry Pi projects site |
| `raspberrypi_org__read_page` | Read a page on raspberrypi.org |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/raspberrypi.org`

```sh
claude mcp add --transport http raspberrypi https://unbrowse.ai/mcp/raspberrypi.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill raspberrypi` (or `npx skills add unbrowse-ai/sites --skill raspberrypi`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/raspberrypi.org/openapi.json
