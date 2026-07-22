// 不蒜子访问量：只显示总计 PV / UV 两个数
type Item = { id: string; title: string; ariaLabel: string; svg: "eye" | "user" };

const PV_ITEM: Item[] = [
  { id: "busuanzi_site_pv", title: "本站总 PV：所有时间累计的页面访问次数（每次刷新 +1）", ariaLabel: "本站总浏览量", svg: "eye" },
];
const UV_ITEM: Item[] = [
  { id: "busuanzi_site_uv", title: "本站总 UV：所有时间累计的独立访客数（同一天同一 IP 算 1 次）", ariaLabel: "本站总访客数", svg: "user" },
];

function Eye() {
  return (
    <svg className="inline-block w-3 h-3 mr-1 align-[-2px] opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function User() {
  return (
    <svg className="inline-block w-3 h-3 mr-1 align-[-2px] opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function Group({ label, items, Icon }: { label: string; items: Item[]; Icon: () => React.ReactNode }) {
  const it = items[0];
  return (
    <span className="inline-flex items-center gap-1.5" aria-label={label}>
      <Icon />
      <span title={it.title} aria-label={it.title}>
        <span className="text-slate-900 font-semibold tabular-nums" id={it.id}>
          加载中...
        </span>
      </span>
    </span>
  );
}

export default function BusuanziStats() {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[clamp(0.7rem,1.05vh,0.76rem)] text-slate-400"
      title="不蒜子统计：PV = 页面访问次数；UV = 独立访客数"
      aria-label="站点访问统计"
    >
      <Group label="总浏览量（PV）" items={PV_ITEM} Icon={Eye} />
      <span className="w-px h-3 bg-slate-200 inline-block" aria-hidden />
      <Group label="总访客数（UV）" items={UV_ITEM} Icon={User} />
      <span className="w-px h-3 bg-slate-200 inline-block" aria-hidden />
      <span title="© 2026 隆诚.work — 自 2026 年起记录装修全过程">© 2026 隆诚.work</span>
    </div>
  );
}
