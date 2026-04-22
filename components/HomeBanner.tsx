"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    title: "4.4 SIÊU SALE",
    sub: "Giảm đến 50% — Freeship toàn quốc",
    bg: "from-[#ff2c55] to-[#ff6e47]",
    emoji: "🌿",
  },
  {
    title: "Cây Phong Thủy",
    sub: "Hút tài lộc — Tặng chậu sứ",
    bg: "from-[#25f4ee] to-[#0c9c94]",
    emoji: "🪴",
  },
  {
    title: "Bộ Sưu Tập Sen Đá",
    sub: "Combo 5 cây chỉ 89K",
    bg: "from-[#ffc300] to-[#ff6e47]",
    emoji: "🌵",
  },
];

export default function HomeBanner() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mx-3 mt-3 rounded-xl overflow-hidden relative h-[140px]">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 bg-gradient-to-br ${s.bg} transition-opacity duration-500 flex items-center justify-between px-5`}
          style={{ opacity: i === idx ? 1 : 0 }}
        >
          <div className="text-white">
            <div className="text-[11px] font-medium opacity-90">PlantShop • 2026</div>
            <div className="text-2xl font-extrabold mt-1 leading-none">{s.title}</div>
            <div className="text-xs mt-2 opacity-95">{s.sub}</div>
            <button className="mt-3 bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
              Mua ngay →
            </button>
          </div>
          <div className="text-7xl">{s.emoji}</div>
        </div>
      ))}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`h-1 rounded-full transition-all ${
              i === idx ? "w-4 bg-white" : "w-1 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
