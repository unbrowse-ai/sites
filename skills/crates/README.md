# Unbrowse for Crates — MCP & skill (unofficial)

crates.io as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by crates.io.

| Tool | What it does |
|---|---|
| `crates_io__get_crates` | Search crates |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/crates.io`

```sh
claude mcp add --transport http crates https://unbrowse.ai/mcp/crates.io
```

**Skill**: `npx skills add https://unbrowse.ai --skill crates` (or `npx skills add unbrowse-ai/sites --skill crates`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/crates.io/openapi.json
