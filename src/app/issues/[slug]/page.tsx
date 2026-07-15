import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getIssues } from "@/content/loaders";
import { Mdx } from "@/lib/mdx";
import { Reveal } from "@/components/motion/reveal";

export async function generateStaticParams() {
  const issues = await getIssues();
  return issues.map((i) => ({ slug: encodeURIComponent(i.slug) }));
}

export default async function IssuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const issues = await getIssues();
  const issue = issues.find((i) => i.slug === slug);
  if (!issue) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <Reveal>
        <Link
          href="/issues"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          返回 N 宗列表
        </Link>
      </Reveal>
      <Reveal delay={0.1}>
        <header className="mb-10 border-b border-border pb-10">
          <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <time className="font-mono text-xs text-muted-foreground">
              {issue.date}
            </time>
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
              {issue.category}
            </span>
            <span
              className={
                issue.resolved
                  ? "rounded-full bg-green-100 px-2.5 py-0.5 text-xs text-green-800 dark:bg-green-900/30 dark:text-green-200"
                  : "rounded-full bg-amber-100 px-2.5 py-0.5 text-xs text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
              }
            >
              {issue.resolved ? "已处理" : "待处理"}
            </span>
          </div>
          <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
            {issue.title}
          </h1>
          {issue.excerpt && (
            <p className="mt-4 text-lg text-muted-foreground">{issue.excerpt}</p>
          )}
        </header>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="prose prose-stone max-w-none dark:prose-invert">
          {issue.body ? (
            <Mdx source={issue.body} />
          ) : (
            <p className="text-muted-foreground">暂无正文。</p>
          )}
        </div>
      </Reveal>
    </article>
  );
}
