# Unbrowse for Arxiv — MCP & skill (unofficial)

arxiv.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by arxiv.org.

| Tool | What it does |
|---|---|
| `arxiv_org__get_search_advanced` | Search arXiv with advanced field filters such as author, title, subject category |
| `arxiv_org__get_cs_ai_recent` | Browse latest papers in a category |
| `arxiv_org__read_page` | Search arXiv papers by keyword |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/arxiv.org`

```sh
claude mcp add --transport http arxiv https://unbrowse.ai/mcp/arxiv.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill arxiv` (or `npx skills add unbrowse-ai/sites --skill arxiv`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/arxiv.org/openapi.json
