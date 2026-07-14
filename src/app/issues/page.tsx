import { Reveal } from "@/components/motion/reveal";
import { getIssues } from "@/content/loaders";

export const metadata = { title: "N 宗" };

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
          装修过程中遇到的问题、踩过的坑、以及最终如何解决。
        </p>
      </Reveal>
      {issues.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
          暂未记录。添加 <code className="rounded bg-muted px-1.5 py-0.5">.mdx</code> 到 <code className="rounded bg-muted px-1.5 py-0.5">src/content/issues/</code>。
        </p>
      ) : (
        <ul className="space-y-4">
          {issues.map((issue) => (
            <li
              key={issue.slug}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-serif text-lg font-medium">{issue.title}</h2>
                <time className="font-mono text-xs text-muted-foreground">{issue.date}</time>
              </div>
              {issue.excerpt && (
                <p className="mt-2 text-sm text-muted-foreground">{issue.excerpt}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
