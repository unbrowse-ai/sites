# Unbrowse for Reddit — MCP & skill (unofficial)

reddit.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by reddit.com.

| Tool | What it does |
|---|---|
| `reddit_com__render_page` | Search Reddit posts by query |
| `old_reddit_com__read_page` | Read a old.reddit.com page by name |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/reddit.com`

```sh
claude mcp add --transport http reddit https://unbrowse.ai/mcp/reddit.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill reddit` (or `npx skills add unbrowse-ai/sites --skill reddit`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/reddit.com/openapi.json
