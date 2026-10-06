# Unbrowse for Gutenberg — MCP & skill (unofficial)

gutenberg.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by gutenberg.org.

| Tool | What it does |
|---|---|
| `gutenberg_org__get_ebooks_search` | Search gutenberg |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/gutenberg.org`

```sh
claude mcp add --transport http gutenberg https://unbrowse.ai/mcp/gutenberg.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill gutenberg` (or `npx skills add unbrowse-ai/sites --skill gutenberg`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/gutenberg.org/openapi.json
