# Unbrowse for Timeanddate — MCP & skill (unofficial)

timeanddate.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by timeanddate.com.

| Tool | What it does |
|---|---|
| `timeanddate_com__get_worldclock` | Search timeanddate |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/timeanddate.com`

```sh
claude mcp add --transport http timeanddate https://unbrowse.ai/mcp/timeanddate.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill timeanddate` (or `npx skills add unbrowse-ai/sites --skill timeanddate`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/timeanddate.com/openapi.json
