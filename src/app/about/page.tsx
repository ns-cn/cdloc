import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site";

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
            本页记录隆诚房屋装修的全过程：合同签订、开工、水电、地暖防水、推拉门、木工吊顶、赔偿事项、待协调整改、地砖铺贴等各阶段的真实情况。
          </p>
          <p>
            所有节点均按实际施工进度记录，希望给正在装修或准备装修的朋友一些参考。
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-12 space-y-6">
          <div>
            <h2 className="mb-2 font-serif text-2xl font-medium tracking-tight">
              房源
            </h2>
            <p className="text-muted-foreground">
              {siteConfig.location} · {siteConfig.unit}
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-serif text-2xl font-medium tracking-tight">
              装修方与主要工种
            </h2>
            <ul className="space-y-1 text-muted-foreground">
              <li>总包方：隆诚建筑装饰工程有限公司</li>
              <li>水电：雨梵 · 匡师傅</li>
              <li>地暖：地暖 · 小余</li>
              <li>窗户：欢佳门窗 · 王磊</li>
              <li>风管机：小米之家 · 万象城店</li>
              <li>水管：日丰</li>
              <li>厨房定制：美格</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 font-serif text-2xl font-medium tracking-tight">
              资料归档
            </h2>
            <p className="text-muted-foreground">
              所有原始资料（合同、收据、照片、报告、协议）归档在飞书知识库「绛溪里 A111001」中。
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              编号规则：JX-A111001-YYYYMMDD-序号
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
