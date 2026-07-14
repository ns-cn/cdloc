import type { Phase } from "@/content/schemas";
import { PhaseCard } from "@/components/cards/phase-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export function Timeline({ phases }: { phases: Phase[] }) {
  if (phases.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <p className="text-muted-foreground">暂无阶段记录。前往 <code className="rounded bg-muted px-1.5 py-0.5">src/content/phases</code> 添加 .mdx 文件。</p>
      </section>
    );
  }
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <Reveal>
        <div className="mb-14 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Timeline
            </p>
            <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
              装修时间线
            </h2>
          </div>
          <p className="hidden text-sm text-muted-foreground sm:block">
            共 {phases.length} 个阶段
          </p>
        </div>
      </Reveal>
      <Stagger className="relative space-y-6">
        <div
          aria-hidden
          className="absolute left-[19px] top-2 bottom-2 w-px bg-border sm:left-[27px]"
        />
        {phases.map((phase, i) => (
          <StaggerItem key={phase.slug}>
            <PhaseCard phase={phase} index={i} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
