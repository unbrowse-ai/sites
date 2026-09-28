# Unbrowse for Orf — MCP & skill (unofficial)

orf.at as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by orf.at.

| Tool | What it does |
|---|---|
| `orf_at__get_nsr_get_front_page_video` | Read latest news on orf.at |
| `wetter_orf_at__get_vod_wetter_json` | Browse Austria weather forecasts |
| `orf_at__read_page` | Read a page on orf.at |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/orf.at`

```sh
claude mcp add --transport http orf-at https://unbrowse.ai/mcp/orf.at
```

**Skill**: `npx skills add https://unbrowse.ai --skill orf-at` (or `npx skills add unbrowse-ai/sites --skill orf-at`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/orf.at/openapi.json
