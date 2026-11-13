# Unbrowse sites — one MCP and one skill per website

Unofficial: not affiliated with or endorsed by any site listed. Each folder is a website as agent tools, compiled by [Unbrowse](https://unbrowse.ai) from the site's own first-party requests: a scoped remote MCP server (only that site's tools) and a SKILL.md that uses it. Regenerated from the live registry; a site is listed only when its tools passed verification.

```sh
npx skills add https://unbrowse.ai --skill airbnb               # one skill, from unbrowse.ai
npx skills add unbrowse-ai/sites --skill airbnb         # the same, from this repo
claude mcp add --transport http airbnb https://unbrowse.ai/mcp/airbnb.com
```

| Site | Skill | MCP | Tools |
|---|---|---|---|
| Usedesk (usedesk.ru) | [`usedesk-ru`](skills/usedesk-ru/SKILL.md) | `https://unbrowse.ai/mcp/usedesk.ru` | 4 |
| Konnectbot (konnectbot.com) | [`konnectbot`](skills/konnectbot/SKILL.md) | `https://unbrowse.ai/mcp/konnectbot.com` | 3 |
| Acuityscheduling (acuityscheduling.com) | [`acuityscheduling`](skills/acuityscheduling/SKILL.md) | `https://unbrowse.ai/mcp/acuityscheduling.com` | 1 |
| Lazada (lazada.sg) | [`lazada-sg`](skills/lazada-sg/SKILL.md) | `https://unbrowse.ai/mcp/lazada.sg` | 1 |
| Qq (qq.com) | [`qq`](skills/qq/SKILL.md) | `https://unbrowse.ai/mcp/qq.com` | 1 |

Any other site: the general [Unbrowse](https://github.com/unbrowse-ai/unbrowse) skill and `https://unbrowse.ai/mcp`.
