# Unbrowse for Ashbyhq — MCP & skill (unofficial)

ashbyhq.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by ashbyhq.com.

| Tool | What it does |
|---|---|
| `api_ashbyhq_com__get_job_board_notion` | Ashby job board: open jobs |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/ashbyhq.com`

```sh
claude mcp add --transport http ashbyhq https://unbrowse.ai/mcp/ashbyhq.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill ashbyhq` (or `npx skills add unbrowse-ai/sites --skill ashbyhq`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/ashbyhq.com/openapi.json
