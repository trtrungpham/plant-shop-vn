"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Product } from "@/lib/products";
import { formatVND } from "@/lib/format";

function useCountdown(targetMs: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, targetMs - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { h, m, s };
}

export default function FlashSaleBar({ products }: { products: Product[] }) {
  // always 6h from load for demo
  const [target] = useState(() => Date.now() + 6 * 3600 * 1000 + 32 * 60 * 1000);
  const { h, m, s } = useCountdown(target);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="bg-gradient-to-r from-[#ff3d5b] via-[#ff2c55] to-[#ff6e47] rounded-xl mx-3 mt-3 overflow-hidden">
      <div className="flex items-center justify-between px-3 pt-2.5 pb-2">
        <div className="flex items-center gap-2 text-white">
          <span className="text-base font-bold">⚡ Flash Sale</span>
          <div className="flex items-center gap-1 text-[13px] font-semibold">
            <span className="bg-black text-white px-1 rounded">{pad(h)}</span>
            <span>:</span>
            <span className="bg-black text-white px-1 rounded">{pad(m)}</span>
            <span>:</span>
            <span className="bg-black text-white px-1 rounded">{pad(s)}</span>
          </div>
        </div>
        <Link href="/flash-sale" className="text-white text-xs flex items-center">
          Xem tất cả <ChevronRight size={14} />
        </Link>
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-3 pb-3">
        {products.map((p) => (
          <Link
            href={`/product/${p.id}`}
            key={p.id}
            className="shrink-0 w-[100px] bg-white rounded-lg overflow-hidden"
          >
            <div className="relative w-full aspect-square">
              <Image
                src={p.images[0]}
                alt={p.name}
                fill
                sizes="100px"
                className="object-cover"
              />
            </div>
            <div className="px-1.5 py-1">
              <div className="text-brand-red font-bold text-[13px]">
                {formatVND(p.price)}
              </div>
              <div className="h-1 bg-brand-red/15 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-brand-red"
                  style={{ width: `${Math.min(95, 30 + (p.sold % 70))}%` }}
                />
              </div>
              <div className="text-[10px] text-brand-red font-medium mt-0.5">
                Đã bán {p.sold >= 1000 ? `${(p.sold / 1000).toFixed(1)}k` : p.sold}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
