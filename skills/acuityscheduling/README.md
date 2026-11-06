# Unbrowse for Acuityscheduling — MCP & skill (unofficial)

acuityscheduling.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by acuityscheduling.com.

| Tool | What it does |
|---|---|
| `app_acuityscheduling_com__get_availability_times` | Yay Clay Philadelphia class availability |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/acuityscheduling.com`

```sh
claude mcp add --transport http acuityscheduling https://unbrowse.ai/mcp/acuityscheduling.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill acuityscheduling` (or `npx skills add unbrowse-ai/sites --skill acuityscheduling`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/acuityscheduling.com/openapi.json
