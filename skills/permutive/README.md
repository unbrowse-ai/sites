# Unbrowse for Permutive — MCP & skill (unofficial)

permutive.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by permutive.com.

| Tool | What it does |
|---|---|
| `permutive_com__get_resources` | Open a Permutive resource article |
| `permutive_com__get_search` | Search permutive.com |
| `permutive_com__read_page` | Read a page on permutive.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/permutive.com`

```sh
claude mcp add --transport http permutive https://unbrowse.ai/mcp/permutive.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill permutive` (or `npx skills add unbrowse-ai/sites --skill permutive`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/permutive.com/openapi.json
