# Unbrowse for Ikea — MCP & skill (unofficial)

ikea.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by ikea.com.

| Tool | What it does |
|---|---|
| `ikea_com__post_en_search` | Search ikea |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/ikea.com`

```sh
claude mcp add --transport http ikea https://unbrowse.ai/mcp/ikea.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill ikea` (or `npx skills add unbrowse-ai/sites --skill ikea`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/ikea.com/openapi.json
