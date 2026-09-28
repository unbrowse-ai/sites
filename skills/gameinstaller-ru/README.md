# Unbrowse for Gameinstaller — MCP & skill (unofficial)

gameinstaller.ru as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by gameinstaller.ru.

| Tool | What it does |
|---|---|
| `gameinstaller_ru__get_usearch_php` | Open a game detail page on gameinstaller.ru |
| `gameinstaller_ru__get_root` | Search games on gameinstaller.ru |
| `gameinstaller_ru__read_page` | Read a page on gameinstaller.ru |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/gameinstaller.ru`

```sh
claude mcp add --transport http gameinstaller-ru https://unbrowse.ai/mcp/gameinstaller.ru
```

**Skill**: `npx skills add https://unbrowse.ai --skill gameinstaller-ru` (or `npx skills add unbrowse-ai/sites --skill gameinstaller-ru`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/gameinstaller.ru/openapi.json
