# Unbrowse for Capterra — MCP & skill (unofficial)

capterra.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by capterra.com.

| Tool | What it does |
|---|---|
| `capterra_com__post_search` | Search software on Capterra |
| `capterra_com__read_page` | Browse a software category listing |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/capterra.com`

```sh
claude mcp add --transport http capterra https://unbrowse.ai/mcp/capterra.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill capterra` (or `npx skills add unbrowse-ai/sites --skill capterra`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/capterra.com/openapi.json
