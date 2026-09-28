# Unbrowse for Bitwarden — MCP & skill (unofficial)

bitwarden.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by bitwarden.com.

| Tool | What it does |
|---|---|
| `bitwarden_com__get_pricing_all` | Read Bitwarden pricing for personal and business plans |
| `bitwarden_com__get_solutions_healthcare` | Browse Bitwarden product and solution pages |
| `bitwarden_com__read_page` | Read a page on bitwarden.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/bitwarden.com`

```sh
claude mcp add --transport http bitwarden https://unbrowse.ai/mcp/bitwarden.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill bitwarden` (or `npx skills add unbrowse-ai/sites --skill bitwarden`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/bitwarden.com/openapi.json
