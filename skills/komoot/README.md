# Unbrowse for Komoot — MCP & skill (unofficial)

komoot.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by komoot.com.

| Tool | What it does |
|---|---|
| `komoot_com__get_1_355235_103_796882_elements` | Open a komoot tour (route) detail page |
| `komoot_com__read_page` | Read a page on komoot.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/komoot.com`

```sh
claude mcp add --transport http komoot https://unbrowse.ai/mcp/komoot.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill komoot` (or `npx skills add unbrowse-ai/sites --skill komoot`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/komoot.com/openapi.json
