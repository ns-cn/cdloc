# Next.js 15 + Tailwind 4 迁移 todo

## Phase 1: deps
- [ ] T01 install Next 15 + React 19 + Tailwind 4 + OpenNext
- [ ] T02 remove hono deps, clean old src/

## Phase 2: config
- [ ] T03 tsconfig.json + next.config.ts
- [ ] T04 tailwind config + postcss
- [ ] T05 open-next.config.ts + wrangler.jsonc (CF Pages)

## Phase 3: app
- [ ] T06 app/layout.tsx (HTML root + metadata)
- [ ] T07 app/page.tsx (server component)
- [ ] T08 app/globals.css (Tailwind + 一屏样式)
- [ ] T09 lib/pillars.ts (4 张卡片数据)
- [ ] T10 components/QrModal.tsx ('use client')
- [ ] T11 components/QrTrigger.tsx (按钮封装)
- [ ] T12 components/BusuanziStats.tsx

## Phase 4: responsive
- [ ] T13 360-768 px 移动布局（CTA 100%, 卡片单列, 弹层 bottom-sheet）
- [ ] T14 768-1024 平板
- [ ] T15 1024+ 桌面横排 4 列

## Phase 5: 微信二维码
- [ ] T16 copy wechat-qr.jpg → public/
- [ ] T17 QR SCRIPT inline (open/close/copy/escape)

## Phase 6: 测试/部署
- [ ] T18 vitest + @testing-library/react
- [ ] T19 wrangler dev 验证 mobile/desktop
- [ ] T20 wrangler deploy
