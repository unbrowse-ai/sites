# Unbrowse for Myworkdayjobs — MCP & skill (unofficial)

myworkdayjobs.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by myworkdayjobs.com.

| Tool | What it does |
|---|---|
| `dbs_wd3_myworkdayjobs_com__render_page` | Search jobs by keyword, location and category on the DBS Careers job search page |
| `dbs_wd3_myworkdayjobs_com__read_page` | Read dbs.wd3.myworkdayjobs.com/en-US/DBS_Careers |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/myworkdayjobs.com`

```sh
claude mcp add --transport http myworkdayjobs https://unbrowse.ai/mcp/myworkdayjobs.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill myworkdayjobs` (or `npx skills add unbrowse-ai/sites --skill myworkdayjobs`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/myworkdayjobs.com/openapi.json
