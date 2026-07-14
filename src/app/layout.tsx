import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Serif_SC } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSerif = Noto_Serif_SC({
  variable: "--font-noto-serif",
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "zh_CN",
    type: "website",
  },
  authors: [{ name: siteConfig.author }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable}`}
    >
      <body className="bg-background text-foreground min-h-dvh antialiased">
        <ThemeProvider defaultTheme="system">
          <MotionProvider>
            <SmoothScroll>
              <div className="relative flex min-h-dvh flex-col">
                <SiteHeader />
                <main className="flex-1">{children}</main>
                <SiteFooter />
              </div>
            </SmoothScroll>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
