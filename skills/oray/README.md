# Unbrowse for Oray — MCP & skill (unofficial)

oray.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by oray.com.

| Tool | What it does |
|---|---|
| `store_oray_com__get_catalog` | Browse the Oray store catalog with product prices |
| `oray_com__read_page` | Read a page on oray.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/oray.com`

```sh
claude mcp add --transport http oray https://unbrowse.ai/mcp/oray.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill oray` (or `npx skills add unbrowse-ai/sites --skill oray`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/oray.com/openapi.json
