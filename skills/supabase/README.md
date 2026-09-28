# Unbrowse for Supabase — MCP & skill (unofficial)

supabase.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by supabase.com.

| Tool | What it does |
|---|---|
| `supabase_com__get_partners_catalog` | Browse the Supabase blog |
| `supabase_com__read_page` | Read a page on supabase.com |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/supabase.com`

```sh
claude mcp add --transport http supabase https://unbrowse.ai/mcp/supabase.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill supabase` (or `npx skills add unbrowse-ai/sites --skill supabase`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/supabase.com/openapi.json
