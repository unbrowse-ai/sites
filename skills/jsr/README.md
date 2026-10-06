# Unbrowse for Jsr — MCP & skill (unofficial)

jsr.io as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by jsr.io.

| Tool | What it does |
|---|---|
| `jsr_io__get_packages` | Search jsr |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/jsr.io`

```sh
claude mcp add --transport http jsr https://unbrowse.ai/mcp/jsr.io
```

**Skill**: `npx skills add https://unbrowse.ai --skill jsr` (or `npx skills add unbrowse-ai/sites --skill jsr`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/jsr.io/openapi.json
