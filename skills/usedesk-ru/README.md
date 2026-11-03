# Unbrowse for Usedesk — MCP & skill (unofficial)

usedesk.ru as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by usedesk.ru.

| Tool | What it does |
|---|---|
| `secure_usedesk_ru__get_get_data_tickets_by_tags` | marsique — Юздеск 161951: основной отчёт, теги |
| `secure_usedesk_ru__get_get_data_ticket_list_by_status` | marsique — Юздеск 161951: основной отчёт, статусы |
| `secure_usedesk_ru__get_get_data_macroses_count` | marsique — Юздеск 161951: основной отчёт, шаблоны |
| `secure_usedesk_ru__get_get_data_triggers_count` | marsique — Юздеск 161951: основной отчёт, правила |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/usedesk.ru`

```sh
claude mcp add --transport http usedesk-ru https://unbrowse.ai/mcp/usedesk.ru
```

**Skill**: `npx skills add https://unbrowse.ai --skill usedesk-ru` (or `npx skills add unbrowse-ai/sites --skill usedesk-ru`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/usedesk.ru/openapi.json
