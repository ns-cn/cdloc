# Cloudflare Workers

## 改动工作流（强制）

任何对代码的修改（不论 UI、文案、路由、依赖、配置），MUST 按顺序完成以下三步才允许部署到 Cloudflare：

1. **编译检查**：跑项目自身的构建命令（`npm run build` / `npx next build` 等，参见 `package.json` scripts），确认构建无错误。改的是 Workers 入口（`src/` 或 Hono/Next 等纯 JS/TS）也 MUST 至少跑一次 `npx wrangler types` + `npm test`，确认类型与单测通过。
2. **本地启动 + 截图自验**：本地 dev server 起来（`npm run dev` 或 `npx wrangler dev --env dev`，端口参见项目约定），用浏览器或截图工具打开改动涉及的页面，肉眼确认改动**实际生效**——不是只看代码就放行。仅终端打印 "compiled successfully" 不算自验。
3. **部署到 Cloudflare**：只有前两步都通过，才能跑 `npm run deploy` / `npx wrangler deploy`。

反向约束：任何时候 `wrangler deploy` 出现红字失败或构建报红，MUST 立刻停下处理，不得带着失败状态继续往下做。

STOP. Your knowledge of Cloudflare Workers APIs and limits may be outdated. Always retrieve current documentation before any Workers, KV, R2, D1, Durable Objects, Queues, Vectorize, AI, or Agents SDK task.

## Docs

- https://developers.cloudflare.com/workers/
- MCP: `https://docs.mcp.cloudflare.com/mcp`

For all limits and quotas, retrieve from the product's `/platform/limits/` page. eg. `/workers/platform/limits`

## Commands

| Command | Purpose |
|---------|---------|
| `npx wrangler dev` | Local development |
| `npx wrangler deploy` | Deploy to Cloudflare |
| `npx wrangler types` | Generate TypeScript types |

Run `wrangler types` after changing bindings in wrangler.jsonc.

## Node.js Compatibility

https://developers.cloudflare.com/workers/runtime-apis/nodejs/

## Errors

- **Error 1102** (CPU/Memory exceeded): Retrieve limits from `/workers/platform/limits/`
- **All errors**: https://developers.cloudflare.com/workers/observability/errors/

## Product Docs

Retrieve API references and limits from:
`/kv/` · `/r2/` · `/d1/` · `/durable-objects/` · `/queues/` · `/vectorize/` · `/workers-ai/` · `/agents/`

## Best Practices (conditional)

If the application uses Durable Objects or Workflows, refer to the relevant best practices:

- Durable Objects: https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/
- Workflows: https://developers.cloudflare.com/workflows/build/rules-of-workflows/
