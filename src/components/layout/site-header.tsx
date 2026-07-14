"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors",
        scrolled
          ? "border-border bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-tight"
        >
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {siteConfig.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-md px-3 py-1.5 transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                <AnimatePresence>
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-md bg-muted"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
          <div className="ml-2 border-l border-border pl-2">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
