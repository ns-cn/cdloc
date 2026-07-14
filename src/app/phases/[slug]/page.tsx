import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPhases } from "@/content/loaders";
import { Mdx } from "@/lib/mdx";
import { Reveal } from "@/components/motion/reveal";

export async function generateStaticParams() {
  const phases = await getPhases();
  // Next passes URL-encoded slug at runtime; encode here so the prerendered
  // route keys match the incoming params.
  return phases.map((p) => ({ slug: encodeURIComponent(p.slug) }));
}

export default async function PhasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const phases = await getPhases();
  const phase = phases.find((p) => p.slug === slug);
  if (!phase) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <Reveal>
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          返回时间线
        </Link>
      </Reveal>
      <Reveal delay={0.1}>
        <header className="mb-10 border-b border-border pb-10">
          <time className="font-mono text-xs text-muted-foreground">{phase.date}</time>
          <h1 className="mt-2 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
            {phase.title}
          </h1>
        </header>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="prose prose-stone max-w-none dark:prose-invert">
          {phase.body ? <Mdx source={phase.body} /> : <p className="text-muted-foreground">暂无正文。</p>}
        </div>
      </Reveal>
    </article>
  );
}
