# Unbrowse for Yummyani — MCP & skill (unofficial)

yummyani.me as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by yummyani.me.

| Tool | What it does |
|---|---|
| `old_yummyani_me__get_search_2` | Search yummyani.me |
| `yummyani_me__get_search_2` | Search anime by name |
| `old_yummyani_me__read_page` | Browse TOP-100 anime rankings |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/yummyani.me`

```sh
claude mcp add --transport http yummyani-me https://unbrowse.ai/mcp/yummyani.me
```

**Skill**: `npx skills add https://unbrowse.ai --skill yummyani-me` (or `npx skills add unbrowse-ai/sites --skill yummyani-me`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/yummyani.me/openapi.json
