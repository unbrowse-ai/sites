# Unbrowse for Archlinux — MCP & skill (unofficial)

archlinux.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by archlinux.org.

| Tool | What it does |
|---|---|
| `archlinux_org__get_news` | Read latest news |
| `archlinux_org__get_packages` | Search packages |
| `archlinux_org__read_page` | Read a page on archlinux.org |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/archlinux.org`

```sh
claude mcp add --transport http archlinux https://unbrowse.ai/mcp/archlinux.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill archlinux` (or `npx skills add unbrowse-ai/sites --skill archlinux`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/archlinux.org/openapi.json
