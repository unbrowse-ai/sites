# Unbrowse for Domaindetails — MCP & skill (unofficial)

domaindetails.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by domaindetails.com.

| Tool | What it does |
|---|---|
| `domaindetails_com__render_page` | Look up domain WHOIS/RDAP details |
| `domaindetails_com__read_page` | Read a page on domaindetails.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/domaindetails.com`

```sh
claude mcp add --transport http domaindetails https://unbrowse.ai/mcp/domaindetails.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill domaindetails` (or `npx skills add unbrowse-ai/sites --skill domaindetails`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/domaindetails.com/openapi.json
