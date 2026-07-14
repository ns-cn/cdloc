/**
 * Site-wide configuration. Adjust here to retheme the entire project.
 */
export const siteConfig = {
  name: "隆诚装修记录",
  shortName: "LongCheng",
  description:
    "隆诚房屋装修全过程真实记录 —— 时间线、问题、解决方案。从毛坯到入住的每一个细节。",
  url: "https://longcheng.vercel.app",
  ogImage: "/og.png",
  locale: "zh-CN",
  author: "LongCheng",
  nav: [
    { href: "/", label: "时间线" },
    { href: "/issues", label: "N 宗" },
    { href: "/about", label: "关于" },
  ],
  social: {
    // 预留位
  },
} as const;

export type SiteConfig = typeof siteConfig;
