"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Bell } from "lucide-react";
import { getFlashSaleProducts, products } from "@/lib/products";
import { formatVND, percentOff } from "@/lib/format";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  return {
    h: String(Math.floor(diff / 3600000)).padStart(2, "0"),
    m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
    s: String(Math.floor((diff % 60000) / 1000)).padStart(2, "0"),
  };
}

const SLOTS = [
  { label: "00:00", status: "ended" },
  { label: "09:00", status: "ended" },
  { label: "12:00", status: "live" },
  { label: "18:00", status: "upcoming" },
  { label: "21:00", status: "upcoming" },
];

export default function FlashSalePage() {
  const flashItems = getFlashSaleProducts();
  const upcoming = products.filter((p) => !p.flashSale).slice(0, 6);
  const [target] = useState(() => Date.now() + 2 * 3600 * 1000 + 45 * 60 * 1000);
  const { h, m, s } = useCountdown(target);

  return (
    <>
      <header className="sticky top-0 z-30 bg-gradient-to-r from-tt-red to-[#ff3d5b] text-white px-3 py-3 flex items-center gap-2">
        <Link href="/" className="w-8 h-8 flex items-center justify-center text-white">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="flex-1 text-base font-semibold">⚡ Flash Sale</h1>
      </header>

      {/* Hero countdown */}
      <section className="bg-gradient-to-br from-[#ff2c55] via-[#ff3d5b] to-[#ff6e47] text-white px-4 py-5 text-center">
        <div className="text-[12px] font-medium opacity-90">Khung giờ vàng 12:00 kết thúc sau</div>
        <div className="mt-2 flex items-center justify-center gap-1 font-mono">
          {[h, m, s].map((v, i) => (
            <span key={i} className="contents">
              <span className="bg-black/80 text-white rounded-md px-3 py-2 text-2xl font-bold tabular-nums">
                {v}
              </span>
              {i < 2 && <span className="text-2xl mx-0.5">:</span>}
            </span>
          ))}
        </div>
        <div className="mt-2 text-[11px] opacity-90 tracking-widest">GIỜ   PHÚT   GIÂY</div>
      </section>

      {/* Slots */}
      <section className="bg-white px-3 py-3 border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {SLOTS.map((slot) => (
            <button
              key={slot.label}
              className={`shrink-0 flex flex-col items-center justify-center w-16 py-1.5 rounded-lg ${
                slot.status === "live"
                  ? "bg-tt-red text-white"
                  : slot.status === "upcoming"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-gray-50 text-gray-400"
              }`}
            >
              <span className="text-[13px] font-bold">{slot.label}</span>
              <span className="text-[10px]">
                {slot.status === "live" ? "Đang sale" : slot.status === "upcoming" ? "Sắp mở" : "Đã kết thúc"}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Flash products list */}
      <section className="bg-white mt-2">
        <div className="px-3 py-2 border-b border-gray-100">
          <h3 className="text-[13px] font-bold text-tt-red">🔥 ĐANG BÁN CHẠY</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {flashItems.map((p) => {
            const off = percentOff(p.originalPrice, p.price);
            const soldPct = Math.min(95, 30 + (p.sold % 70));
            return (
              <Link key={p.id} href={`/product/${p.id}`} className="flex items-center gap-3 px-3 py-3">
                <div className="relative w-[90px] h-[90px] rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  <Image src={p.images[0]} alt={p.name} fill sizes="90px" className="object-cover" />
                  <div className="absolute top-1 left-1 bg-tt-red text-white text-[9px] font-bold px-1 rounded">
                    -{off}%
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[13px] line-clamp-2 leading-tight">{p.name}</h3>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-tt-red font-bold text-base">{formatVND(p.price)}</span>
                    <span className="text-[11px] text-gray-400 line-through">{formatVND(p.originalPrice)}</span>
                  </div>
                  <div className="mt-2 relative h-5 bg-tt-red/10 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-tt-red to-tt-orange"
                      style={{ width: `${soldPct}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow">
                      🔥 ĐÃ BÁN {p.sold >= 1000 ? `${(p.sold / 1000).toFixed(1)}k` : p.sold}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Upcoming */}
      <section className="bg-white mt-2 px-3 py-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[13px] font-bold">Sắp mở bán lúc 18:00</h3>
          <button className="text-[11px] text-tt-red flex items-center gap-1">
            <Bell size={12} /> Nhắc tôi
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {upcoming.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
