# Unbrowse for Caniuse — MCP & skill (unofficial)

caniuse.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by caniuse.com.

| Tool | What it does |
|---|---|
| `caniuse_com__get_process_query` | Search caniuse |
| `caniuse_com__get_search` | Search caniuse.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/caniuse.com`

```sh
claude mcp add --transport http caniuse https://unbrowse.ai/mcp/caniuse.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill caniuse` (or `npx skills add unbrowse-ai/sites --skill caniuse`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/caniuse.com/openapi.json
