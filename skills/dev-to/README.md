# Unbrowse for Dev — MCP & skill (unofficial)

dev.to as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by dev.to.

| Tool | What it does |
|---|---|
| `dev_to__post_anonymous_2` | Search devto |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/dev.to`

```sh
claude mcp add --transport http dev-to https://unbrowse.ai/mcp/dev.to
```

**Skill**: `npx skills add https://unbrowse.ai --skill dev-to` (or `npx skills add unbrowse-ai/sites --skill dev-to`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/dev.to/openapi.json
