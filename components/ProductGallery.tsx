"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = el.clientWidth;
        const i = Math.round(el.scrollLeft / w);
        setIdx(i);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative aspect-square bg-white">
      <div
        ref={trackRef}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
      >
        {images.map((src, i) => (
          <div key={i} className="relative shrink-0 w-full h-full snap-center">
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              fill
              priority={i === 0}
              sizes="480px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute top-2 left-2 bg-white/90 rounded-full px-2 py-1 text-[11px] font-medium flex items-center gap-1 shadow-sm">
        🌱 Trang trí phòng
      </div>

      <div className="absolute bottom-2 right-3 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded-full">
        {idx + 1}/{images.length}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ảnh ${i + 1}`}
              className={`h-1 rounded-full transition-all ${
                i === idx ? "w-4 bg-white" : "w-1 bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
