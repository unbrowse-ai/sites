# Unbrowse for Lokalise — MCP & skill (unofficial)

lokalise.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by lokalise.com.

| Tool | What it does |
|---|---|
| `lokalise_com__get_ai_agents_next_d_locale_oc_rest_page_txt` | Open a Lokalise product feature page |
| `lokalise_com__get_blog_next_d_locale_blog_page_txt` | Read Lokalise blog |
| `lokalise_com__get_webinars_next_d_locale_oc_rest_page_txt` | Browse webinars library |
| `lokalise_com__read_page` | Read a page on lokalise.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/lokalise.com`

```sh
claude mcp add --transport http lokalise https://unbrowse.ai/mcp/lokalise.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill lokalise` (or `npx skills add unbrowse-ai/sites --skill lokalise`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/lokalise.com/openapi.json
