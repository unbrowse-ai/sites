# Unbrowse for Respawn — MCP & skill (unofficial)

respawn.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by respawn.com.

| Tool | What it does |
|---|---|
| `respawn_com__get_data_games` | List games |
| `respawn_com__get_data_news` | List news |
| `respawn_com__get_data_careers` | Browse games |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/respawn.com`

```sh
claude mcp add --transport http respawn https://unbrowse.ai/mcp/respawn.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill respawn` (or `npx skills add unbrowse-ai/sites --skill respawn`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/respawn.com/openapi.json
