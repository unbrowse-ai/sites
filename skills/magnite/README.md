# Unbrowse for Magnite — MCP & skill (unofficial)

magnite.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by magnite.com.

| Tool | What it does |
|---|---|
| `magnite_com__get_wp_posts` | Browse the Magnite blog listing |
| `magnite_com__get_root` | Search the Magnite site for content |
| `magnite_com__read_page` | Read a page on magnite.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/magnite.com`

```sh
claude mcp add --transport http magnite https://unbrowse.ai/mcp/magnite.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill magnite` (or `npx skills add unbrowse-ai/sites --skill magnite`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/magnite.com/openapi.json
