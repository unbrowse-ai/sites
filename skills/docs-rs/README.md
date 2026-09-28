# Unbrowse for Docs — MCP & skill (unofficial)

docs.rs as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests. Verified results, no browser on your side. Not affiliated with or endorsed by docs.rs.

| Tool | What it does |
|---|---|
| `docs_rs__get_search` | Search docs.rs |
| `docs_rs__get_releases_search` | search docs.rs for serde |
| `docs_rs__read_page` | Read a page on docs.rs |

**MCP** (remote, streamable HTTP, OAuth): `https://unbrowse.ai/mcp/docs.rs`

```sh
claude mcp add --transport http docs-rs https://unbrowse.ai/mcp/docs.rs
```

**Skill**: `npx skills add https://unbrowse.ai --skill docs-rs` (or `npx skills add unbrowse-ai/sites --skill docs-rs`) — see [SKILL.md](SKILL.md).

REST + OpenAPI: https://unbrowse.ai/api/v1/sites/docs.rs/openapi.json
