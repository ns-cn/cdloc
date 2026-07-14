import Link from "next/link";
import type { Phase } from "@/content/schemas";
import { cn } from "@/lib/utils";

const STAGE_LABELS: Record<Phase["stage"], string> = {
  design: "设计",
  demolition: "拆改",
  plumbing: "水电",
  masonry: "泥工",
  carpentry: "木工",
  painting: "油漆",
  installation: "安装",
  "soft-decoration": "软装",
};

export function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  return (
    <Link
      href={`/phases/${phase.slug}`}
      className="group relative block rounded-lg border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-lg sm:p-8"
    >
      <div className="flex items-start gap-4 sm:gap-6">
        <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background font-mono text-xs text-muted-foreground sm:size-14 sm:text-sm">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-serif text-xl font-medium transition-colors group-hover:text-accent sm:text-2xl">
              {phase.title}
            </h3>
            <time className="font-mono text-xs text-muted-foreground">
              {phase.date}
            </time>
          </div>
          <div className="mb-3 flex flex-wrap gap-1.5">
            <span
              className={cn(
                "rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
              )}
            >
              {STAGE_LABELS[phase.stage]}
            </span>
            {phase.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          {phase.excerpt && (
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {phase.excerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
