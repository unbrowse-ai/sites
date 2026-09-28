# Unbrowse for Hoekee — MCP & skill (unofficial)

hoekee.com.sg as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by hoekee.com.sg.

| Tool | What it does |
|---|---|
| `hoekee_com_sg__get_search` | Search hoekee.com.sg |
| `hoekee_com_sg__read_page` | Read a page on hoekee.com.sg |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/hoekee.com.sg`

```sh
claude mcp add --transport http hoekee-com-sg https://unbrowse.ai/mcp/hoekee.com.sg
```

**Skill**: `npx skills add https://unbrowse.ai --skill hoekee-com-sg` (or `npx skills add unbrowse-ai/sites --skill hoekee-com-sg`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/hoekee.com.sg/openapi.json
