---
name: kijiji-ca
description: "Kijiji (kijiji.ca) for agents: Search listings; Open a listing page; Read a page on kijiji.ca — through Unbrowse's scoped MCP for kijiji.ca (unofficial), which replays kijiji.ca's own first-party API (no browser, verified results). Use when the user wants anything from kijiji.ca, e.g. search listings."
---

# Unbrowse for Kijiji (kijiji.ca)

Kijiji as tools for your agent. Unofficial: not affiliated with or endorsed by kijiji.ca. Unbrowse compiled these from kijiji.ca's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no kijiji.ca API key.

## Connect the kijiji.ca MCP

This server is a tool scope holding only kijiji.ca: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on kijiji.ca.

```sh
claude mcp add --transport http kijiji-ca https://unbrowse.ai/mcp/kijiji.ca
codex mcp add kijiji-ca --url https://unbrowse.ai/mcp/kijiji.ca && codex mcp login kijiji-ca
```

```json
{"mcpServers":{"kijiji-ca":{"url":"https://unbrowse.ai/mcp/kijiji.ca"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch kijiji.ca some other way and present it as this skill's result.

## Tools

### `kijiji_ca__render_page` — Search listings

Search listings. Inputs: query. Returns the page's title, readable text and links. Read-only on kijiji.ca.

- `query` (string, required) — query — what to search for on kijiji.ca

```json
{"query":"<query>"}
```

### `kijiji_ca__post_get_listings_similar` — Open a listing page

Open a listing page. Inputs: variables_listing_id. Returns data. Read-only on kijiji.ca.

- `variables_listing_id` (integer, required) — variables listing id
- `isExternalId` (string) — optional, e.g. false
- 1 more of the site's own parameters (locale, paging and the like), sent as recorded

```json
{"variables_listing_id":"<variables_listing_id>"}
```

### `kijiji_ca__read_page` — Read a page on kijiji.ca

Read any page on kijiji.ca — a path such as /news/2026/some-story, or a full kijiji.ca URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on kijiji.ca.

- `path` (string, required) — A page on kijiji.ca: a path like /about, or a full URL on kijiji.ca

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on kijiji.ca in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on kijiji.ca), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on kijiji.ca → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off kijiji.ca is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills kijiji.ca's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/kijiji.ca/call/kijiji_ca__render_page \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"query":"<query>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/kijiji.ca/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
