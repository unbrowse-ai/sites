# Unbrowse for Huggingface — MCP & skill (unofficial)

huggingface.co as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by huggingface.co.

| Tool | What it does |
|---|---|
| `huggingface_co__get_models_json` | Search huggingface |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/huggingface.co`

```sh
claude mcp add --transport http huggingface https://unbrowse.ai/mcp/huggingface.co
```

**Skill**: `npx skills add https://unbrowse.ai --skill huggingface` (or `npx skills add unbrowse-ai/sites --skill huggingface`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/huggingface.co/openapi.json
