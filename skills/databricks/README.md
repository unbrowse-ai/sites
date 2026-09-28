# Unbrowse for Databricks — MCP & skill (unofficial)

databricks.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by databricks.com.

| Tool | What it does |
|---|---|
| `databricks_com__get_data_strategy_page_data_json` | Browse Databricks blog posts by category |
| `databricks_com__get_data_lakehouse_page_data_json` | Browse product pages on Databricks |
| `databricks_com__read_page` | Read a page on databricks.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/databricks.com`

```sh
claude mcp add --transport http databricks https://unbrowse.ai/mcp/databricks.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill databricks` (or `npx skills add unbrowse-ai/sites --skill databricks`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/databricks.com/openapi.json
