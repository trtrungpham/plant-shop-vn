"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Search } from "lucide-react";
import ChatDrawer from "@/components/ChatDrawer";
import { getShops, products } from "@/lib/products";

export default function MessagesPage() {
  const shops = getShops();
  const [openShop, setOpenShop] = useState<string | null>(null);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white px-3 py-3 flex items-center gap-2 border-b border-gray-100">
        <Link href="/" className="w-8 h-8 flex items-center justify-center -ml-1">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="flex-1 text-base font-semibold">Tin nhắn</h1>
        <Search size={20} className="text-gray-600" />
      </header>

      <div className="bg-white">
        {shops.map((s) => {
          const first = products.find((p) => p.shop === s.name);
          return (
            <button
              key={s.slug}
              onClick={() => setOpenShop(s.name)}
              className="w-full flex items-center gap-3 px-3 py-3 border-b border-gray-50 text-left"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-green-200 to-green-500 flex items-center justify-center text-white font-bold shrink-0">
                {first ? (
                  <Image src={first.images[0]} alt={s.name} fill sizes="48px" className="object-cover" />
                ) : (
                  s.name[0]
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[13px] truncate">{s.name}</span>
                  <span className="text-[10px] bg-green-100 text-green-700 px-1 rounded">Mall</span>
                </div>
                <p className="text-[12px] text-gray-500 truncate">
                  Dạ shop đang online — chat ngay để được tư vấn 💚
                </p>
              </div>
              <div className="text-[10px] text-gray-400">Now</div>
            </button>
          );
        })}
      </div>

      <ChatDrawer
        open={openShop !== null}
        onClose={() => setOpenShop(null)}
        shopName={openShop ?? ""}
      />
    </>
  );
}
