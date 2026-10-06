# Unbrowse for Hex — MCP & skill (unofficial)

hex.pm as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by hex.pm.

| Tool | What it does |
|---|---|
| `hex_pm__get_packages` | Search hex |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/hex.pm`

```sh
claude mcp add --transport http hex-pm https://unbrowse.ai/mcp/hex.pm
```

**Skill**: `npx skills add https://unbrowse.ai --skill hex-pm` (or `npx skills add unbrowse-ai/sites --skill hex-pm`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/hex.pm/openapi.json
