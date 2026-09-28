# Unbrowse for Phonepe — MCP & skill (unofficial)

phonepe.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by phonepe.com.

| Tool | What it does |
|---|---|
| `phonepe_com__get_insurance_page_data_json` | Browse PhonePe blog articles by category |
| `phonepe_com__read_page` | Read a page on phonepe.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/phonepe.com`

```sh
claude mcp add --transport http phonepe https://unbrowse.ai/mcp/phonepe.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill phonepe` (or `npx skills add unbrowse-ai/sites --skill phonepe`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/phonepe.com/openapi.json
