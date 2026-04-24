"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Ticket, CircleCheck as CheckCircle } from "lucide-react";
import Footer from "@/components/Footer";
import { VOUCHERS, type Voucher } from "@/lib/vouchers";
import { formatVND } from "@/lib/format";

const CLAIMED_KEY = "plantshop_claimed_vouchers_v1";

function useClaimed() {
  const [claimed, setClaimed] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(CLAIMED_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const claim = (code: string) => {
    const next = claimed.includes(code) ? claimed : [...claimed, code];
    setClaimed(next);
    localStorage.setItem(CLAIMED_KEY, JSON.stringify(next));
  };
  return { claimed, claim };
}

function daysLeft(ms: number) {
  return Math.max(0, Math.ceil((ms - Date.now()) / (24 * 3600 * 1000)));
}

export default function VouchersPage() {
  const { claimed, claim } = useClaimed();
  const [tab, setTab] = useState<"all" | "freeship" | "discount" | "gift">("all");
  const list = VOUCHERS.filter((v) => tab === "all" || v.category === tab);

  return (
    <>
      <header className="sticky top-0 z-30 bg-gradient-to-r from-tt-red to-[#ff6e47] text-white px-3 py-3 flex items-center gap-2">
        <Link href="/" className="w-8 h-8 flex items-center justify-center -ml-1 text-white">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="flex-1 text-base font-semibold">Kho voucher</h1>
        <Ticket size={20} />
      </header>

      <section className="bg-white px-3 py-2 flex gap-2 overflow-x-auto no-scrollbar border-b border-gray-100">
        {[
          { key: "all", label: "Tất cả" },
          { key: "freeship", label: "🚚 Freeship" },
          { key: "discount", label: "💸 Giảm giá" },
          { key: "gift", label: "🎁 Quà tặng" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as typeof tab)}
            className={`shrink-0 text-[12px] px-3 py-1.5 rounded-full ${
              tab === t.key ? "bg-tt-red text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </section>

      <div className="p-3 space-y-2">
        {list.map((v) => (
          <VoucherCard
            key={v.code}
            voucher={v}
            claimed={claimed.includes(v.code)}
            onClaim={() => claim(v.code)}
          />
        ))}
      </div>

      <Footer />
    </>
  );
}

function VoucherCard({
  voucher: v,
  claimed,
  onClaim,
}: {
  voucher: Voucher;
  claimed: boolean;
  onClaim: () => void;
}) {
  const color =
    v.category === "freeship"
      ? "from-tt-cyan/20 to-white border-[#0c9c94]/30"
      : v.category === "gift"
      ? "from-[#fff8e1] to-white border-[#b77b00]/30"
      : "from-tt-red/10 to-white border-tt-red/30";

  const leftColor =
    v.category === "freeship"
      ? "bg-[#0c9c94]"
      : v.category === "gift"
      ? "bg-[#b77b00]"
      : "bg-tt-red";

  return (
    <div className={`flex bg-gradient-to-r ${color} border rounded-xl overflow-hidden`}>
      <div className={`${leftColor} w-24 flex flex-col items-center justify-center text-white p-2 shrink-0`}>
        {v.type === "freeship" ? (
          <>
            <div className="text-[10px] font-medium">FREESHIP</div>
            <div className="text-xl font-extrabold leading-none mt-1">
              {(v.value / 1000).toFixed(0)}K
            </div>
          </>
        ) : v.type === "percent" ? (
          <>
            <div className="text-xl font-extrabold leading-none">-{v.value}%</div>
            <div className="text-[10px] mt-1 opacity-90">Giảm</div>
          </>
        ) : (
          <>
            <div className="text-xl font-extrabold leading-none">
              {(v.value / 1000).toFixed(0)}K
            </div>
            <div className="text-[10px] mt-1 opacity-90">Giảm</div>
          </>
        )}
      </div>
      <div className="flex-1 p-3 min-w-0">
        <div className="flex items-center gap-1">
          <h3 className="text-[13px] font-semibold truncate">{v.title}</h3>
          {v.badge && (
            <span className="text-[10px] bg-tt-red text-white px-1 rounded font-bold">
              {v.badge}
            </span>
          )}
        </div>
        <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-2">{v.description}</p>
        <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-2">
          {v.minOrder > 0 && <span>Đơn từ {formatVND(v.minOrder)}</span>}
          <span>•</span>
          <span>Hết hạn: {daysLeft(v.expiresAt)} ngày</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <code className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-mono">
            {v.code}
          </code>
          {claimed ? (
            <span className="text-[11px] text-green-600 flex items-center gap-0.5">
              <CheckCircle size={12} /> Đã lưu
            </span>
          ) : (
            <button
              onClick={onClaim}
              className="text-[11px] bg-tt-red text-white font-semibold px-3 py-1 rounded-full"
            >
              Lưu ngay
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
