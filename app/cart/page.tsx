"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { formatVND } from "@/lib/format";

export default function CartPage() {
  const router = useRouter();
  const { items, updateQty, removeItem, total } = useCart();

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-[140px]">
      <header className="sticky top-0 z-30 bg-white px-3 py-3 flex items-center gap-2 border-b border-gray-100">
        <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center -ml-1">
          <ArrowLeft size={22} />
        </button>
        <h1 className="flex-1 text-base font-semibold">
          Giỏ hàng {items.length > 0 && `(${items.length})`}
        </h1>
        <button className="text-sm text-gray-700">Sửa</button>
      </header>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <ShoppingCart size={48} className="text-gray-300" />
          <p className="mt-3 text-sm">Giỏ hàng đang trống</p>
          <Link
            href="/"
            className="mt-4 bg-tt-red text-white px-5 py-2 rounded-full text-sm font-medium"
          >
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="mt-2 space-y-2">
          {items.map((item) => (
            <div key={item.id} className="bg-white px-3 py-3 flex gap-2.5">
              <div className="relative w-[76px] h-[76px] rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <Image src={item.image} alt={item.name} fill sizes="76px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-gray-500">{item.shop}</div>
                <h3 className="text-[13px] line-clamp-2 leading-tight">{item.name}</h3>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-tt-red font-bold text-[15px]">
                    {formatVND(item.price)}
                  </div>
                  <div className="flex items-center gap-0 border border-gray-200 rounded-md">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-7 h-7 flex items-center justify-center"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-7 text-center text-[13px]">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-7 h-7 flex items-center justify-center"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="w-8 h-8 flex items-center justify-center text-gray-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="fixed bottom-[64px] left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-100 px-3 py-3 flex items-center gap-3 z-30">
          <div className="flex-1">
            <div className="text-[11px] text-gray-500">Tổng cộng</div>
            <div className="text-tt-red font-bold text-xl">{formatVND(total)}</div>
          </div>
          <button
            onClick={() => router.push("/checkout")}
            className="bg-gradient-to-r from-tt-red to-[#ff3d5b] text-white font-bold px-6 py-3 rounded-full text-sm"
          >
            Mua hàng
          </button>
        </div>
      )}
    </div>
  );
}
