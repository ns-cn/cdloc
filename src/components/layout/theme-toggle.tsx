"use client";

import { useTheme } from "@/components/providers/theme-provider";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { resolved, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolved === "dark";
  const next = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={`切换到${isDark ? "浅色" : "深色"}模式`}
      onClick={() => setTheme(next)}
      className="relative inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <m.span
            key={resolved}
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 45, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </m.span>
        )}
      </AnimatePresence>
    </button>
  );
}
