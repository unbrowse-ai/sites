# Unbrowse for Kijiji — MCP & skill (unofficial)

kijiji.ca as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by kijiji.ca.

| Tool | What it does |
|---|---|
| `kijiji_ca__render_page` | Search listings |
| `kijiji_ca__post_get_listings_similar` | Open a listing page |
| `kijiji_ca__read_page` | Read a page on kijiji.ca |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/kijiji.ca`

```sh
claude mcp add --transport http kijiji-ca https://unbrowse.ai/mcp/kijiji.ca
```

**Skill**: `npx skills add https://unbrowse.ai --skill kijiji-ca` (or `npx skills add unbrowse-ai/sites --skill kijiji-ca`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/kijiji.ca/openapi.json
