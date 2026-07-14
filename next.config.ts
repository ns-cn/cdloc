import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // 本地照片直接放在 /public/photos/ 下，next/image 会自动优化
    formats: ["image/avif", "image/webp"],
  },
  // 静态导出配置（如果之后想用 `output: 'export'` 也可开启）
  experimental: {
    // mdx server components 已在 next-mdx-remote/rsc 中处理
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
