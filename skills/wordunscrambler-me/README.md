# Unbrowse for Wordunscrambler — MCP & skill (unofficial)

wordunscrambler.me as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by wordunscrambler.me.

| Tool | What it does |
|---|---|
| `wordunscrambler_me__render_page` | Search wordunscrambler.me |
| `wordunscrambler_me__read_page` | Read a page on wordunscrambler.me |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/wordunscrambler.me`

```sh
claude mcp add --transport http wordunscrambler-me https://unbrowse.ai/mcp/wordunscrambler.me
```

**Skill**: `npx skills add https://unbrowse.ai --skill wordunscrambler-me` (or `npx skills add unbrowse-ai/sites --skill wordunscrambler-me`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/wordunscrambler.me/openapi.json
