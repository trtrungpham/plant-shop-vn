"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, MessageCircle, ShoppingCart, MoreHorizontal, Share2, X } from "lucide-react";
import { useCart } from "./CartProvider";

type Props = {
  variant?: "home" | "search" | "product" | "simple";
  title?: string;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  transparent?: boolean;
};

export default function MobileHeader({
  variant = "home",
  title,
  searchValue,
  onSearchChange,
  transparent,
}: Props) {
  const router = useRouter();
  const { count } = useCart();

  if (variant === "product") {
    return (
      <header
        className={`sticky top-0 z-30 ${
          transparent ? "bg-transparent" : "bg-white"
        } px-3 py-2.5 flex items-center gap-2`}
      >
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-sm"
        >
          <X size={18} />
        </button>
        <div className="flex-1 h-9 bg-white/90 rounded-full flex items-center px-3 gap-2 shadow-sm">
          <Search size={16} className="text-gray-500" />
          <span className="text-sm text-gray-700 truncate">{title || "Tìm kiếm"}</span>
        </div>
        <button className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center">
          <Share2 size={16} />
        </button>
        <Link href="/cart" className="relative w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center">
          <ShoppingCart size={16} />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-tt-red text-white text-[10px] leading-none font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </Link>
        <button className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center">
          <MoreHorizontal size={18} />
        </button>
      </header>
    );
  }

  if (variant === "simple") {
    return (
      <header className="sticky top-0 z-30 bg-white px-3 py-3 flex items-center gap-2 border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center -ml-1"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="flex-1 text-base font-semibold truncate">{title}</h1>
      </header>
    );
  }

  if (variant === "search") {
    return (
      <header className="sticky top-0 z-30 bg-white px-3 py-2.5 flex items-center gap-2 border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center -ml-1"
        >
          <ArrowLeft size={22} />
        </button>
        <div className="flex-1 h-9 bg-gray-100 rounded-full flex items-center px-3 gap-2">
          <Search size={16} className="text-gray-500" />
          <input
            value={searchValue || ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Tìm cây cảnh, chậu, hạt giống..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            autoFocus
          />
        </div>
        <button className="text-sm font-medium text-gray-800 px-1">Tìm</button>
      </header>
    );
  }

  // home
  return (
    <header className="sticky top-0 z-30 bg-white px-3 py-2.5 flex items-center gap-2 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      <Link href="/search" className="flex-1 h-9 bg-gray-100 rounded-full flex items-center px-3 gap-2">
        <Search size={16} className="text-gray-500" />
        <span className="text-sm text-gray-500 truncate">Trầu bà monstera size lớn</span>
      </Link>
      <Link href="/messages" className="w-9 h-9 flex items-center justify-center relative">
        <MessageCircle size={22} className="text-gray-800" />
        <span className="absolute top-1 right-1 bg-tt-red w-2 h-2 rounded-full" />
      </Link>
      <Link href="/cart" className="w-9 h-9 flex items-center justify-center relative">
        <ShoppingCart size={22} className="text-gray-800" />
        {count > 0 && (
          <span className="absolute top-0 right-0 bg-tt-red text-white text-[10px] leading-none font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </Link>
    </header>
  );
}
