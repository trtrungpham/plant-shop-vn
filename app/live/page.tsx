import Image from "next/image";
import Link from "next/link";
import MobileHeader from "@/components/MobileHeader";
import { products } from "@/lib/products";
import { Heart, Eye } from "lucide-react";

export default function LivePage() {
  const lives = products.slice(0, 8);
  return (
    <>
      <MobileHeader variant="simple" title="LIVE — Đang phát" />
      <div className="grid grid-cols-2 gap-2 p-3">
        {lives.map((p, i) => (
          <Link
            key={p.id}
            href={`/product/${p.id}`}
            className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-200"
          >
            <Image src={p.images[0]} alt={p.name} fill sizes="50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
            <div className="absolute top-2 left-2 bg-tt-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
              🔴 LIVE
            </div>
            <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
              <Eye size={10} /> {(i + 1) * 234}
            </div>
            <div className="absolute bottom-2 left-2 right-2 text-white">
              <div className="text-[11px] font-semibold line-clamp-1">{p.shop}</div>
              <div className="text-[10px] opacity-90 line-clamp-1">{p.name}</div>
            </div>
            <button className="absolute bottom-10 right-2 w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white">
              <Heart size={14} />
            </button>
          </Link>
        ))}
      </div>
    </>
  );
}
