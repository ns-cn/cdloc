"use client";

import { useEffect, useState } from "react";
import { WECHAT_ID } from "@/lib/pillars";

// 全局唯一二维码弹层实例，任何 [data-open-qr] 按钮点击触发显示
export default function QrModal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      // 关闭按钮
      if (target.closest("[data-close]") && open) {
        setOpen(false);
        setCopied(false);
        return;
      }
      // 打开按钮
      const opener = target.closest("[data-open-qr]");
      if (opener) {
        e.preventDefault();
        setOpen(true);
        setCopied(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpen(false);
        setCopied(false);
      }
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(WECHAT_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-900/55 backdrop-blur-sm p-4
                 max-md:items-end max-md:p-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-title"
    >
      <div
        className="relative bg-white rounded-2xl w-full max-w-[360px]
                   max-md:rounded-b-none max-md:pb-7
                   p-6 shadow-2xl flex flex-col items-center gap-3 animate-[qrPop_.22s_ease_both]"
      >
        <button
          type="button"
          data-close
          aria-label="关闭"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 grid place-items-center text-xl leading-none"
        >
          ×
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/wechat-qr.jpg"
          alt="微信二维码"
          className="w-full max-w-[280px] aspect-square rounded-lg"
          width={280}
          height={280}
        />
        <div id="qr-title" className="text-base font-bold text-slate-900">
          扫码加我微信
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 max-w-full">
          <span>微信号：</span>
          <code className="text-slate-900 font-semibold break-all">
            {WECHAT_ID}
          </code>
          <button
            type="button"
            onClick={copy}
            className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-md px-2 py-0.5 hover:bg-indigo-100 transition"
          >
            {copied ? "已复制" : "复制"}
          </button>
        </div>
        <div className="text-xs text-slate-400">加我时请备注「隆诚.work」</div>
      </div>
    </div>
  );
}
