import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mb-4 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
        页面未找到
      </h1>
      <p className="mb-8 text-muted-foreground">
        你访问的页面可能已被移动或不存在。
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-colors hover:opacity-90"
      >
        <ArrowLeft className="size-4" />
        返回首页
      </Link>
    </section>
  );
}
