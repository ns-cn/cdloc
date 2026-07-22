import Script from "next/script";
import QrModal from "@/components/QrModal";
import BusuanziStats from "@/components/BusuanziStats";
import { PILLARS } from "@/lib/pillars";

// 每张预告卡的 toolt
const PILLAR_TIPS: Record<string, string> = {
  "合同与报价":
    "上市后会公开每家公司给我的报价单、合同条款、增项与付款节奏。原件扫描 + 文字拆解。",
  "真实的团队":
    "设计师 / 项目经理 / 监理 / 各工种师傅——真实身份、在场时间、负责的部分与我的真实体感。",
  "施工全过程":
    "按时间线记录从拆除到软装的全流程，节点 + 决策 + 变更 + 为什么改，不只发完工照。",
  "踩过的坑与风波":
    "扯皮 / 返工 / 延期 / 失误 / 误会 / 争吵——只记录事实和处理过程，不渲染情绪，不站队。",
};

export default function Home() {
  return (
    <>
      <main className="h-dvh w-full px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 flex">
        <div className="max-w-[1200px] w-full mx-auto flex-1 flex flex-col min-h-0">
          {/* 顶 */}
          <header className="flex items-center justify-between flex-shrink-0 mb-2 sm:mb-3">
            <div
              className="flex items-center gap-2 sm:gap-3 font-bold text-slate-900"
              title="隆诚.work — 一位业主的个人站，记录他家装修的全程"
              aria-label="站点标识"
            >
              <span className="grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-extrabold shadow-lg shadow-indigo-500/25">隆</span>
              <span className="text-base sm:text-[1.12rem] tracking-wide">
                隆诚<em className="not-italic text-indigo-600 font-semibold">.work</em>
              </span>
            </div>
            <span
              className="inline-flex items-center gap-2 text-[clamp(0.7rem,1.6vh,0.78rem)] text-slate-700 border border-slate-200 bg-white/85 px-3 py-1 rounded-full shadow-sm whitespace-nowrap"
              title="装修还未开始，先把站搭起来，等开工后会把现场进展陆续加进来"
              aria-label="当前状态：装修未开始，内容筹备中"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.13)]" />
              内容筹备中
            </span>
          </header>

          {/* 中 */}
          <section
            className="flex-1 min-h-0 flex flex-col items-stretch justify-evenly text-center gap-3 sm:gap-4 overflow-y-auto overscroll-contain"
            aria-label="网站主体内容"
          >
            <div className="flex justify-center">
              <div
                className="inline-flex items-center gap-2 text-[clamp(0.8rem,1.6vh,0.9rem)] text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm max-w-full"
                title="本站唯一作者与叙述者——隆诚本人"
                aria-label="我是业主隆诚，2026 年要装修自己的房子"
              >
                <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-[0.7rem] sm:text-xs font-bold grid place-items-center">隆</span>
                <span className="text-left">我是 <strong className="text-slate-900 font-semibold">隆诚</strong>，这家的业主，2026 年要装修自己的房子</span>
              </div>
            </div>

            <h1
              className="font-extrabold tracking-tight text-slate-900 mx-auto max-w-[22ch] text-[clamp(1.5rem,3.4vh,2.9rem)] leading-[1.15]"
              title="整站的立意——真实记录胜过修饰包装"
              aria-label="装修是件大事，我想把真实经过记下来"
            >
              装修是件大事，<br />
              我想把<span className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">真实经过</span>记下来。
            </h1>

            <p
              className="text-[clamp(0.88rem,1.55vh,1.06rem)] text-slate-500 mx-auto max-w-[56ch] leading-relaxed"
              title="为什么没写攻略 / 没接广告——这是业主本人的一条底线"
              aria-label="本站立场：不写攻略，不带货，不接广告"
            >
              这个站不写攻略、不带货、不接广告。合同、报价、付款节奏、每一位到场的人、每一次返工、每一场争执——能公开的我都会公开。<strong className="text-slate-900 font-semibold">为我自己留底，也给后面的业主一份参考。</strong>
            </p>

            <ul
              aria-label="这里会出现的内容"
              className="grid gap-2.5 sm:gap-3 md:gap-4 w-full grid-cols-1 xs:grid-cols-2 lg:grid-cols-4"
            >
              {PILLARS.map((p) => (
                <li
                  key={p.name}
                  className="flex flex-col items-start gap-2 sm:gap-2.5 bg-white border border-slate-200 rounded-xl p-3 sm:p-4 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-slate-300 transition cursor-help"
                  title={PILLAR_TIPS[p.name]}
                  aria-label={`${p.name}：${PILLAR_TIPS[p.name]}`}
                >
                  <div className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-50 to-fuchsia-50 text-indigo-600 border border-indigo-100 font-bold">
                    {p.icon}
                  </div>
                  <div className="font-bold text-[clamp(0.92rem,1.6vh,1.04rem)] text-slate-900 tracking-tight leading-tight">
                    {p.name}
                  </div>
                  <div className="text-[clamp(0.78rem,1.3vh,0.88rem)] text-slate-500 leading-snug">
                    {p.desc}
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-center">
              <button
                type="button"
                data-open-qr
                title="点一下弹出二维码，扫码加业主"
                aria-label="加业主微信；点击弹出微信二维码"
                className="flex items-center justify-center gap-2 px-8 py-3 sm:py-3.5 rounded-xl text-white font-semibold text-base bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30 hover:-translate-y-px hover:shadow-xl hover:shadow-indigo-500/40 transition min-h-[48px] w-[220px] sm:w-[240px]"
              >
                加我微信 <span aria-hidden>→</span>
              </button>
            </div>
          </section>

          <footer
            className="flex flex-row items-center justify-center gap-3 sm:gap-4 pt-3 mt-2 border-t border-slate-100 text-slate-500 text-xs flex-shrink-0"
            aria-label="页脚访问统计与版权"
          >
            <BusuanziStats />
          </footer>
        </div>
      </main>

      <QrModal />

      <Script src="https://cdn.busuanzi.cc/busuanzi/3.6.9/busuanzi.min.js" strategy="lazyOnload" />
    </>
  );
}
