# Unbrowse for Overdrive — MCP & skill (unofficial)

overdrive.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by overdrive.com.

| Tool | What it does |
|---|---|
| `overdrive_com__get_search` | Search titles |
| `overdrive_com__read_page` | Read a page on overdrive.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/overdrive.com`

```sh
claude mcp add --transport http overdrive https://unbrowse.ai/mcp/overdrive.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill overdrive` (or `npx skills add unbrowse-ai/sites --skill overdrive`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/overdrive.com/openapi.json
