# Unbrowse for Expressen — MCP & skill (unofficial)

expressen.se as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by expressen.se.

| Tool | What it does |
|---|---|
| `expressen_se__get_sok` | Search news articles |
| `expressen_se__get_comment_api_comments_by_id` | Open an article page |
| `expressen_se__get_video_player_playlist_by_id` | Browse a news section |
| `expressen_se__read_page` | Read a page on expressen.se |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/expressen.se`

```sh
claude mcp add --transport http expressen-se https://unbrowse.ai/mcp/expressen.se
```

**Skill**: `npx skills add https://unbrowse.ai --skill expressen-se` (or `npx skills add unbrowse-ai/sites --skill expressen-se`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/expressen.se/openapi.json
