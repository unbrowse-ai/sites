# Unbrowse for Brevo — MCP & skill (unofficial)

brevo.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by brevo.com.

| Tool | What it does |
|---|---|
| `brevo_com__get_plans_all` | View Brevo pricing plans |
| `brevo_com__get_7_h098_web` | Explore Brevo homepage and product categories |
| `brevo_com__read_page` | Read a page on brevo.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/brevo.com`

```sh
claude mcp add --transport http brevo https://unbrowse.ai/mcp/brevo.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill brevo` (or `npx skills add unbrowse-ai/sites --skill brevo`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/brevo.com/openapi.json
