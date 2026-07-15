import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { getIssues } from "@/content/loaders";

export const metadata = { title: "N 宗" };

const SEVERITY_LABELS = {
  low: "轻微",
  medium: "中等",
  high: "严重",
} as const;

const SEVERITY_CLASSES = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
  high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200",
} as const;

export default async function IssuesPage() {
  const issues = await getIssues();
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <Reveal>
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Issues
        </p>
        <h1 className="mb-4 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          N 宗
        </h1>
        <p className="mb-12 max-w-2xl text-muted-foreground">
          装修过程中遇到的问题、踩过的坑、以及最终如何解决。共 {issues.length} 项。
        </p>
      </Reveal>
      {issues.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
          暂未记录。
        </p>
      ) : (
        <Stagger className="space-y-4">
          {issues.map((issue) => (
            <StaggerItem key={issue.slug}>
              <Link
                href={`/issues/${encodeURIComponent(issue.slug)}`}
                className="group block rounded-lg border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-lg"
              >
                <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <time className="font-mono text-xs text-muted-foreground">
                    {issue.date}
                  </time>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                    {issue.category}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs ${SEVERITY_CLASSES[issue.severity]}`}
                  >
                    {SEVERITY_LABELS[issue.severity]}
                  </span>
                  <span
                    className={
                      issue.resolved
                        ? "rounded-full bg-green-100 px-2.5 py-0.5 text-xs text-green-800 dark:bg-green-900/30 dark:text-green-200"
                        : "rounded-full bg-orange-100 px-2.5 py-0.5 text-xs text-orange-800 dark:bg-orange-900/30 dark:text-orange-200"
                    }
                  >
                    {issue.resolved ? "已处理" : "待处理"}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-serif text-xl font-medium transition-colors group-hover:text-accent">
                    {issue.title}
                  </h2>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                {issue.excerpt && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {issue.excerpt}
                  </p>
                )}
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </section>
  );
}
