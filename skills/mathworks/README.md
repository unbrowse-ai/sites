# Unbrowse for Mathworks — MCP & skill (unofficial)

mathworks.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by mathworks.com.

| Tool | What it does |
|---|---|
| `mathworks_com__get_r2026b_docset_json` | Open a documentation reference page |
| `blogs_mathworks_com__get_announcements_blogs` | Browse the latest MATLAB blog posts |
| `mathworks_com__read_page` | Browse MATLAB and Simulink products catalog |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/mathworks.com`

```sh
claude mcp add --transport http mathworks https://unbrowse.ai/mcp/mathworks.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill mathworks` (or `npx skills add unbrowse-ai/sites --skill mathworks`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/mathworks.com/openapi.json
