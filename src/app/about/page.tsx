import { Reveal } from "@/components/motion/reveal";

export const metadata = { title: "关于" };

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <Reveal>
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          About
        </p>
        <h1 className="mb-4 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          关于这次装修
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="space-y-4 text-muted-foreground">
          <p>
            本页记录隆诚房屋装修的全过程：设计、拆改、水电、泥木、油漆、安装等各阶段的真实情况。
          </p>
          <p>
            所有照片均为实地拍摄，时间节点按实际施工进度记录，希望给正在装修或准备装修的朋友一些参考。
          </p>
        </div>
      </Reveal>
    </section>
  );
}
