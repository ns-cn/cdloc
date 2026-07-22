import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "隆诚.work — 一位业主的真实装修记录",
  description:
    "我是隆诚，一位普通业主。这里记录我家装修的真实合同、真实团队、真实过程、真实风波——不包装、不美化、不删减。",
  openGraph: {
    title: "隆诚.work — 一位业主的真实装修记录",
    description:
      "真实合同、真实团队、真实过程、真实风波。一个不包装的装修记录站点，业主本人全程记录。",
    type: "website",
  },
  themeColor: "#f6f7fb",
  icons: {
    icon:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='%23f6f7fb'/><text x='50%25' y='54%25' text-anchor='middle' font-family='ui-sans-serif,system-ui' font-size='30' font-weight='700' fill='%23111827'>隆</text></svg>",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
