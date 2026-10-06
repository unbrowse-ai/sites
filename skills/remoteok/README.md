# Unbrowse for Remoteok — MCP & skill (unofficial)

remoteok.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by remoteok.com.

| Tool | What it does |
|---|---|
| `remoteok_com__render_page` | Search remoteok |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/remoteok.com`

```sh
claude mcp add --transport http remoteok https://unbrowse.ai/mcp/remoteok.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill remoteok` (or `npx skills add unbrowse-ai/sites --skill remoteok`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/remoteok.com/openapi.json
