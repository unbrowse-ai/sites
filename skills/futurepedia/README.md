# Unbrowse for Futurepedia — MCP & skill (unofficial)

futurepedia.io as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by futurepedia.io.

| Tool | What it does |
|---|---|
| `futurepedia_io__post_search` | Search AI tools on Futurepedia |
| `futurepedia_io__get_chatnode_related` | Open an AI tool detail page |
| `futurepedia_io__get_search` | Search AI tools by keyword |
| `futurepedia_io__read_page` | Read a futurepedia.io tool page |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/futurepedia.io`

```sh
claude mcp add --transport http futurepedia https://unbrowse.ai/mcp/futurepedia.io
```

**Skill**: `npx skills add https://unbrowse.ai --skill futurepedia` (or `npx skills add unbrowse-ai/sites --skill futurepedia`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/futurepedia.io/openapi.json
