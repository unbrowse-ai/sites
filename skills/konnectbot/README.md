# Unbrowse for Konnectbot — MCP & skill (unofficial)

konnectbot.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by konnectbot.com.

| Tool | What it does |
|---|---|
| `docs_konnectbot_com__post_anonymous` | Search the documentation |
| `konnectbot_com__get_blogs` | Browse blog posts by page |
| `konnectbot_com__read_page` | View the system status page: list current service status and any incident histor |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/konnectbot.com`

```sh
claude mcp add --transport http konnectbot https://unbrowse.ai/mcp/konnectbot.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill konnectbot` (or `npx skills add unbrowse-ai/sites --skill konnectbot`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/konnectbot.com/openapi.json
