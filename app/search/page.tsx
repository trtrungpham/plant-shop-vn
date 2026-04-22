"use client";

import { useState, useMemo } from "react";
import MobileHeader from "@/components/MobileHeader";
import ProductCard from "@/components/ProductCard";
import { products, searchProducts } from "@/lib/products";
import { TrendingUp, Clock } from "lucide-react";

const TRENDING = [
  "trầu bà",
  "sen đá",
  "kim tiền",
  "lan hồ điệp",
  "xương rồng",
  "chậu sứ",
  "bonsai tùng la hán",
  "cây lọc không khí",
];

export default function SearchPage() {
  const [q, setQ] = useState("");
  const results = useMemo(() => (q ? searchProducts(q) : []), [q]);

  return (
    <>
      <MobileHeader variant="search" searchValue={q} onSearchChange={setQ} />
      {!q ? (
        <div className="p-3 space-y-4">
          <section>
            <h3 className="text-[13px] font-semibold flex items-center gap-1">
              <Clock size={14} /> Lịch sử tìm kiếm
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {["trầu bà monstera", "sen đá mini", "chậu sứ"].map((t) => (
                <button
                  key={t}
                  onClick={() => setQ(t)}
                  className="text-[12px] bg-white px-3 py-1.5 rounded-full"
                >
                  {t}
                </button>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-[13px] font-semibold flex items-center gap-1">
              <TrendingUp size={14} className="text-tt-red" /> Tìm kiếm thịnh hành
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {TRENDING.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setQ(t)}
                  className="text-[12px] bg-white px-3 py-1.5 rounded-full flex items-center gap-1"
                >
                  {i < 3 && <span className="text-tt-red font-bold">{i + 1}.</span>}
                  <span>{t}</span>
                </button>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-[13px] font-semibold">Có thể bạn thích</h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {products.slice(0, 6).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="p-3">
          <div className="text-[12px] text-gray-500 mb-2">
            Tìm thấy {results.length} kết quả cho &quot;{q}&quot;
          </div>
          <div className="grid grid-cols-2 gap-2">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
