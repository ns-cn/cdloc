import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <BackgroundGradient />
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-28 sm:pt-32 sm:pb-36">
        <Reveal>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="size-1.5 rounded-full bg-accent" />
            持续更新中
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="max-w-3xl font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl">
            {siteConfig.name}
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {siteConfig.description}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/issues"
              className="group inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-colors hover:opacity-90"
            >
              查看 N 宗
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-2.5 text-sm font-medium backdrop-blur transition-colors hover:bg-card"
            >
              关于本次装修
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
