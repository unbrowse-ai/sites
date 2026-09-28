# Unbrowse for Virtualbox — MCP & skill (unofficial)

virtualbox.org as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by virtualbox.org.

| Tool | What it does |
|---|---|
| `virtualbox_org__get_search` | Search virtualbox.org |
| `virtualbox_org__render_page` | Search VirtualBox site |
| `virtualbox_org__read_page` | Read a page on virtualbox.org |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/virtualbox.org`

```sh
claude mcp add --transport http virtualbox https://unbrowse.ai/mcp/virtualbox.org
```

**Skill**: `npx skills add https://unbrowse.ai --skill virtualbox` (or `npx skills add unbrowse-ai/sites --skill virtualbox`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/virtualbox.org/openapi.json
