# Unbrowse for Buymeacoffee — MCP & skill (unofficial)

buymeacoffee.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by buymeacoffee.com.

| Tool | What it does |
|---|---|
| `buymeacoffee_com__get_project` | Browse featured creators on Buy Me a Coffee homepage |
| `buymeacoffee_com__get_list_kaleighcohen` | View a creator's shop items |
| `buymeacoffee_com__get_creator_kaleighcohen` | Read a creator's posts feed |
| `buymeacoffee_com__read_page` | Read a page on buymeacoffee.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/buymeacoffee.com`

```sh
claude mcp add --transport http buymeacoffee https://unbrowse.ai/mcp/buymeacoffee.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill buymeacoffee` (or `npx skills add unbrowse-ai/sites --skill buymeacoffee`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/buymeacoffee.com/openapi.json
