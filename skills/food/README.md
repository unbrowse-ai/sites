# Unbrowse for Food — MCP & skill (unofficial)

food.com as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by food.com.

| Tool | What it does |
|---|---|
| `food_com__post_nlp_search` | Search foodcom |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/food.com`

```sh
claude mcp add --transport http food https://unbrowse.ai/mcp/food.com
```

**Skill**: `npx skills add https://unbrowse.ai --skill food` (or `npx skills add unbrowse-ai/sites --skill food`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/food.com/openapi.json
