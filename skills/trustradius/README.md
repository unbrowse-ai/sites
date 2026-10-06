# Unbrowse for Trustradius — MCP & skill (unofficial)

trustradius.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by trustradius.com.

| Tool | What it does |
|---|---|
| `trustradius_com__get_search` | Search TrustRadius for software by keyword |
| `trustradius_com__read_page` | Read a trustradius.com product page |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/trustradius.com`

```sh
claude mcp add --transport http trustradius https://unbrowse.ai/mcp/trustradius.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill trustradius` (or `npx skills add unbrowse-ai/sites --skill trustradius`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/trustradius.com/openapi.json
