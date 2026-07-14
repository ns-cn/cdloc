# 隆诚装修记录

> 一个记录装修全过程（时间线、问题、关于）的视觉华丽现代网站，部署在 Vercel。

## 技术栈

- **框架**：Next.js 15 (App Router) + React 19 + TypeScript
- **样式**：Tailwind CSS v4 + CSS Variables 设计系统
- **动效**：Framer Motion（`LazyMotion` 按需加载） + Lenis 平滑滚动
- **内容**：MDX（`next-mdx-remote/rsc`，服务端渲染，零客户端 JS 成本）
- **字体**：Geist Sans / Geist Mono / Noto Serif SC（中文衬线）
- **部署**：Vercel（Git push 自动部署）

## 本地开发

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # 生产构建
npm run start        # 跑生产构建
```

## 目录结构

```
.
├── public/photos/         # 装修照片（git 忽略，按需提交）
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # 根布局 · 注入字体/Providers
│   │   ├── page.tsx       # 首页（时间线）
│   │   ├── phases/[slug]/ # 阶段详情页（动态路由）
│   │   ├── issues/        # N 宗列表
│   │   └── about/         # 关于页
│   ├── components/
│   │   ├── layout/        # 头/脚/主题切换
│   │   ├── sections/      # Hero / Timeline 等区段
│   │   ├── cards/         # 阶段卡片
│   │   ├── ui/            # Aceternity 风格视觉组件
│   │   ├── motion/        # 滚动揭示/错列动画
│   │   └── providers/     # Theme / Motion / SmoothScroll
│   ├── content/
│   │   ├── schemas.ts     # zod 校验 schema
│   │   ├── loaders.ts     # 文件系统读取
│   │   ├── phases/        # 时间线阶段（.mdx）
│   │   └── issues/        # N 宗（.mdx）
│   └── lib/
│       ├── utils.ts       # cn() 工具
│       ├── site.ts        # 站点配置
│       └── mdx.tsx        # MDX 渲染（带 rehype/remark 插件）
├── next.config.ts
└── package.json
```

## 添加新阶段

在 `src/content/phases/` 新建一个 `.mdx` 文件，文件名以序号开头以便排序：

```
01-前期设计.mdx
02-主体拆改.mdx
03-水电改造.mdx
...
```

frontmatter 字段：

```yaml
---
title: 水电改造
date: 2025-02-15           # ISO 格式
order: 3                   # 数字越大越靠后
stage: plumbing            # design | demolition | plumbing | masonry | carpentry | painting | installation | soft-decoration
tags: [水电, 隐蔽工程]     # 可选
excerpt: 一句话摘要         # 可选
---
```

正文用 Markdown 写，可用任何 HTML 元素，标题会自动加锚点。

## 添加新问题（N 宗）

在 `src/content/issues/` 新建 `.mdx` 文件：

```yaml
---
title: 水电点位被改
date: 2025-02-12
severity: medium           # low | medium | high
category: 隐蔽工程
resolved: true
excerpt: 一句话描述
---
```

## 添加 shadcn 组件

```bash
npx shadcn@latest add button card dialog tabs tooltip
```

## 添加 Aceternity 组件

从 [ui.aceternity.com](https://ui.aceternity.com) 复制组件源码，丢进 `src/components/ui/`，再在 `src/components/ui/index.ts` 导出。

## 部署到 Vercel

1. 把代码推到 GitHub
2. 在 Vercel 控制台 Import Project
3. Framework Preset 自动识别为 Next.js
4. 部署即可，默认域名 `https://<project>.vercel.app`

## 主题定制

调色板集中在 `src/app/globals.css` 的 `:root` 和 `.dark` 中。改一个 token，全站生效。
