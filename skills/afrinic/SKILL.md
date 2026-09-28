---
name: afrinic
description: "Afrinic (afrinic.net) for agents: Query AFRINIC RDAP for an IP address; Read a page on afrinic.net — through Unbrowse's scoped MCP for afrinic.net (unofficial), which replays afrinic.net's own first-party API (no browser, verified results). Use when the user wants anything from afrinic.net, e.g. query afrinic rdap for an ip address."
---

# Unbrowse for Afrinic (afrinic.net)

Afrinic as tools for your agent. Unofficial: not affiliated with or endorsed by afrinic.net. Unbrowse compiled these from afrinic.net's own requests: each call replays the site's first-party API server-side and returns a verified result. No scraping of rendered pages, no browser on your side, no afrinic.net API key.

## Connect the afrinic.net MCP

This server is a tool scope holding only afrinic.net: its compiled tools plus the Unbrowse tools that run them, so the agent's tool list stays small and every call stays on afrinic.net.

```sh
claude mcp add --transport http afrinic https://unbrowse.ai/mcp/afrinic.net
codex mcp add afrinic --url https://unbrowse.ai/mcp/afrinic.net && codex mcp login afrinic
```

```json
{"mcpServers":{"afrinic":{"url":"https://unbrowse.ai/mcp/afrinic.net"}}}
```

The first connect signs in to Unbrowse with OAuth (free tier, only verified results count). For scripts, send `Authorization: Bearer $UNBROWSE_API_KEY` (key from https://unbrowse.ai/app/keys; keep it in a secret manager, never in config you commit).

If none of the tools below are in this session's tool list, the server is not connected or not signed in: say so and stop. Do not fetch afrinic.net some other way and present it as this skill's result.

## Tools

### `rdap_afrinic_net__get_ip_196_1_0_0` — Query AFRINIC RDAP for an IP address

Query AFRINIC RDAP for an IP address.

- `rdap` (string, required)

```json
{"rdap":"<rdap>"}
```

### `afrinic_net__read_page` — Read a page on afrinic.net

Read any page on afrinic.net — a path such as /news/2026/some-story, or a full afrinic.net URL — and get its title, readable text and links. One first-party HTTP request, no browser. Follow a returned link by passing its href back as the path.

- `path` (string, required) — A page on afrinic.net: a path like /about, or a full URL on afrinic.net

```json
{"path":"/"}
```

Always there too: `unbrowse.run` (a task on afrinic.net in plain words), `unbrowse.inspect`, `unbrowse.resume`, `unbrowse.scrape` and `unbrowse.map` (any page on afrinic.net), and the recorded cloud browser `unbrowse.browse.open` → `unbrowse.browse.act` → `unbrowse.browse.finish`. Hosts that reject dotted names show them with `_` (`unbrowse_run`).

## How to call

1. Pick the tool whose title matches the job and pass its inputs. Leave the site's recorded parameters out unless the user asked for something they control.
2. Read `status`. `succeeded` carries the verified `result`. `input_required` is not a failure: answer the open fields with `unbrowse.resume {runId, answers}` on the same run.
3. No tool fits: `unbrowse.run {task}`. It fails with `no_capability` when nothing is compiled for that yet: do it once with `unbrowse.browse.open` on afrinic.net → `unbrowse.browse.act` → `unbrowse.browse.finish`, which compiles a new tool this server lists next time. Anything off afrinic.net is refused here (`not_in_scope`): use the general Unbrowse server for that.
4. Signing in: never ask the user for a password. `unbrowse.browse.act` with `action: "autofill"` fills afrinic.net's login from their Unbrowse password manager.
5. Report only what a `succeeded` result says. `outcome_unknown` means a change may have happened: check before retrying. Posting, buying, sending or deleting needs the user's go-ahead.

## Without MCP

Every tool is also a REST call:

```sh
curl -s https://unbrowse.ai/api/v1/sites/rdap.afrinic.net/call/rdap_afrinic_net__get_ip_196_1_0_0 \
  -H "authorization: Bearer $UNBROWSE_API_KEY" -H "content-type: application/json" \
  -d '{"rdap":"<rdap>"}'
```

OpenAPI: https://unbrowse.ai/api/v1/sites/rdap.afrinic.net/openapi.json. Every other site: the general Unbrowse skill (https://github.com/unbrowse-ai/unbrowse) and https://unbrowse.ai/mcp.
