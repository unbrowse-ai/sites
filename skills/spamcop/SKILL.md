---
name: spamcop
description: "Spamcop (spamcop.net) for agents: Check IP blocklist status; Look up abuse contact for IP; Read a page on spamcop.net — through Unbrowse's scoped MCP for spamcop.net (unofficial), which replays spamcop.net's own first-party API (no browser, verified results). Use when the user wants anything from spamcop.net, e.g. check ip blocklist status."
---

# Unbrowse for Spamcop (spamcop.net)

Spamcop as tools for your agent. Unofficial: not affiliated with or endorsed by spamcop.net. Unbrowse compiled these from spamcop.net's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no spamcop.net API key.

## Connect the spamcop.net MCP

This server is a tool scope holding only spamcop.net: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on spamcop.net.

```sh
claude mcp add --transport http spamcop https://unbrowse.ai/mcp/spamcop.net
codex mcp add spamcop --url https://unbrowse.ai/mcp/spamcop.net && codex mcp login spamcop
```

```json
{"mcpServers":{"spamcop":{"url":"https://unbrowse.ai/mcp/spamcop.net"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch spamcop.net some other way and present it as this skill's result.

## Tools

### `spamcop_net__get_w3m` — Check IP blocklist status

Check IP blocklist status. Inputs: ip. Returns the page's title, readable text and links. Read-only on spamcop.net.

- `ip` (string, required) — ip (typed during “fill ip”)
- `action` (string) — optional, e.g. "checkblock"

```json
{"ip":"<ip>"}
```

### `spamcop_net__get_sc` — Look up abuse contact for IP

Look up abuse contact for IP. Inputs: track. Returns the page's title, readable text and links. Read-only on spamcop.net.

- `track` (string, required)

```json
{"track":"<track>"}
```

### `spamcop_net__read_page` — Read a page on spamcop.net

Read any page on spamcop.net — a path such as /news/2026/some-story, or a full spamcop.net URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path. Inputs: path e.g. "/". Returns the page's title, readable text and links. Read-only on spamcop.net.

- `path` (string, required) — A page on spamcop.net: a path like /about, or a full URL on spamcop.net

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on spamcop.net in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on spamcop.net), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on spamcop.net → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off spamcop.net is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills spamcop.net's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/spamcop.net/call/spamcop_net__get_w3m \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"ip":"<ip>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/spamcop.net/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
