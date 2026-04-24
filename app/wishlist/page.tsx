"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { useWishlist } from "@/components/WishlistProvider";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <>
      <header className="sticky top-0 z-30 bg-white px-3 py-3 flex items-center gap-2 border-b border-gray-100">
        <Link href="/" className="w-8 h-8 flex items-center justify-center -ml-1">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="flex-1 text-base font-semibold">
          Yêu thích {items.length > 0 && <span className="text-gray-500 font-normal">({items.length})</span>}
        </h1>
      </header>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-tt-red/10 flex items-center justify-center">
            <Heart size={28} className="text-tt-red" />
          </div>
          <p className="mt-3 text-[14px] font-medium">Chưa có sản phẩm yêu thích</p>
          <p className="mt-1 text-[12px] text-gray-500">
            Bấm 💗 trên sản phẩm bạn thích để lưu lại đây
          </p>
          <Link
            href="/"
            className="mt-4 bg-tt-red text-white px-5 py-2 rounded-full text-sm font-medium"
          >
            Khám phá ngay
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 p-3">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <Footer />
    </>
  );
}
