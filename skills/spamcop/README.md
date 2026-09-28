# Unbrowse for Spamcop — MCP & skill (unofficial)

spamcop.net as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by spamcop.net.

| Tool | What it does |
|---|---|
| `spamcop_net__get_w3m` | Check IP blocklist status |
| `spamcop_net__get_sc` | Look up abuse contact for IP |
| `spamcop_net__read_page` | Read a page on spamcop.net |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/spamcop.net`

```sh
claude mcp add --transport http spamcop https://unbrowse.ai/mcp/spamcop.net
```

**Skill**: `npx skills add https://unbrowse.ai --skill spamcop` (or `npx skills add unbrowse-ai/sites --skill spamcop`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/spamcop.net/openapi.json
