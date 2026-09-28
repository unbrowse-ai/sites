# Unbrowse for Reolink — MCP & skill (unofficial)

reolink.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by reolink.com.

| Tool | What it does |
|---|---|
| `reolink_com__get_session_profile` | Browse Reolink homepage |
| `reolink_com__read_page` | Read a page on reolink.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/reolink.com`

```sh
claude mcp add --transport http reolink https://unbrowse.ai/mcp/reolink.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill reolink` (or `npx skills add unbrowse-ai/sites --skill reolink`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/reolink.com/openapi.json
