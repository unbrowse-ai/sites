# Unbrowse for Nih — MCP & skill (unofficial)

nih.gov as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by nih.gov.

| Tool | What it does |
|---|---|
| `pubmed_ncbi_nlm_nih_gov__get_search` | Search pubmed.ncbi.nlm.nih.gov |
| `nih_gov__read_page` | Read a page on nih.gov |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/nih.gov`

```sh
claude mcp add --transport http nih https://unbrowse.ai/mcp/nih.gov
```

**Skill**: `npx skills add https://unbrowse.ai --skill nih` (or `npx skills add unbrowse-ai/sites --skill nih`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/nih.gov/openapi.json
