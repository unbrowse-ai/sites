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
| Arxiv (arxiv.org) | [`arxiv`](skills/arxiv/SKILL.md) | `https://unbrowse.ai/mcp/arxiv.org` | 3 |
| Carousell (carousell.sg) | [`carousell-sg`](skills/carousell-sg/SKILL.md) | `https://unbrowse.ai/mcp/carousell.sg` | 2 |
| Konnectbot (konnectbot.com) | [`konnectbot`](skills/konnectbot/SKILL.md) | `https://unbrowse.ai/mcp/konnectbot.com` | 3 |
| Datos (datos.gob.ar) | [`datos-gob-ar`](skills/datos-gob-ar/SKILL.md) | `https://unbrowse.ai/mcp/datos.gob.ar` | 2 |
| Craigslist (craigslist.org) | [`craigslist`](skills/craigslist/SKILL.md) | `https://unbrowse.ai/mcp/craigslist.org` | 2 |
| Rakuten (rakuten.co.jp) | [`rakuten-co-jp`](skills/rakuten-co-jp/SKILL.md) | `https://unbrowse.ai/mcp/rakuten.co.jp` | 2 |
| Poshmark (poshmark.com) | [`poshmark`](skills/poshmark/SKILL.md) | `https://unbrowse.ai/mcp/poshmark.com` | 1 |
| Qq (qq.com) | [`qq`](skills/qq/SKILL.md) | `https://unbrowse.ai/mcp/qq.com` | 1 |
| Semanticscholar (semanticscholar.org) | [`semanticscholar`](skills/semanticscholar/SKILL.md) | `https://unbrowse.ai/mcp/semanticscholar.org` | 1 |
| Skyscanner (skyscanner.net) | [`skyscanner`](skills/skyscanner/SKILL.md) | `https://unbrowse.ai/mcp/skyscanner.net` | 1 |
| Alibaba (alibaba.com) | [`alibaba`](skills/alibaba/SKILL.md) | `https://unbrowse.ai/mcp/alibaba.com` | 1 |
| Myworkdayjobs (myworkdayjobs.com) | [`myworkdayjobs`](skills/myworkdayjobs/SKILL.md) | `https://unbrowse.ai/mcp/myworkdayjobs.com` | 1 |
| Propertyguru (propertyguru.com.sg) | [`propertyguru-com-sg`](skills/propertyguru-com-sg/SKILL.md) | `https://unbrowse.ai/mcp/propertyguru.com.sg` | 1 |

Any other site: the general [Unbrowse](https://github.com/unbrowse-ai/unbrowse) skill and `https://unbrowse.ai/mcp`.
