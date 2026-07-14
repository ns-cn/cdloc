import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
        <p>
          © {year} {siteConfig.name} · 持续更新中
        </p>
        <p className="text-xs">Built with Next.js · Deployed on Vercel</p>
      </div>
    </footer>
  );
}
