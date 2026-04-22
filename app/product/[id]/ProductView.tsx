"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  Search,
  Share2,
  ShoppingCart,
  MoreHorizontal,
  ChevronRight,
  Star,
  Store,
  MessageCircle,
  Play,
  Bookmark,
  ArrowUp,
} from "lucide-react";
import { Product } from "@/lib/products";
import { formatVND, percentOff } from "@/lib/format";
import { useCart } from "@/components/CartProvider";
import ProductCard from "@/components/ProductCard";

type Props = { product: Product; related: Product[]; sameShop: Product[] };

const TABS = ["Tổng quan", "Đánh giá", "Mô tả", "Đề xuất"] as const;

export default function ProductView({ product, related, sameShop }: Props) {
  const router = useRouter();
  const { addItem, count } = useCart();
  const [imgIdx, setImgIdx] = useState(0);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Tổng quan");
  const [showToast, setShowToast] = useState(false);
  const off = percentOff(product.originalPrice, product.price);

  // Flash sale countdown
  const [target] = useState(() => Date.now() + 6 * 3600 * 1000 + 32 * 60 * 1000 + 44 * 1000);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const hh = String(Math.floor(diff / 3600000)).padStart(2, "0");
  const mm = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
  const ss = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      shop: product.shop,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      shop: product.shop,
    });
    router.push("/checkout");
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-[70px]">
      {/* Floating header over gallery */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur px-3 py-2.5 flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center"
        >
          <X size={22} />
        </button>
        <div className="flex-1 h-9 bg-gray-100 rounded-full flex items-center px-3 gap-2">
          <Search size={14} className="text-gray-500" />
          <span className="text-[13px] text-gray-600 truncate">trầu bà monstera</span>
        </div>
        <button className="w-8 h-8 flex items-center justify-center">
          <Share2 size={18} />
        </button>
        <Link href="/cart" className="relative w-8 h-8 flex items-center justify-center">
          <ShoppingCart size={20} />
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-tt-red text-white text-[10px] leading-none font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </Link>
        <button className="w-8 h-8 flex items-center justify-center">
          <MoreHorizontal size={20} />
        </button>
      </header>

      {/* Tabs (Tổng quan / Đánh giá / Mô tả / Đề xuất) */}
      <div className="sticky top-[52px] z-20 bg-white border-b border-gray-100">
        <div className="flex">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-[13px] font-medium relative ${
                tab === t ? "text-gray-900" : "text-gray-500"
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-gray-900 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="relative aspect-square bg-white">
        <Image
          src={product.images[imgIdx]}
          alt={product.name}
          fill
          priority
          sizes="480px"
          className="object-cover"
        />
        <div className="absolute top-2 left-2 bg-white/90 rounded-full px-2 py-1 text-[11px] font-medium flex items-center gap-1 shadow-sm">
          🌱 Trang trí phòng
        </div>
        <div className="absolute bottom-2 right-3 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded-full">
          {imgIdx + 1}/{product.images.length}
        </div>
        {/* Image pagination dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`h-1 rounded-full transition-all ${
                  i === imgIdx ? "w-4 bg-white" : "w-1 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Promo row */}
      <div className="bg-white px-3 py-2 flex gap-2 overflow-x-auto no-scrollbar border-b border-gray-100">
        <span className="shrink-0 text-[10px] bg-gradient-to-r from-[#ff2c55] to-[#ff6e47] text-white px-1.5 py-0.5 rounded font-bold">
          XTRA
        </span>
        <span className="shrink-0 text-[10px] text-tt-red border border-tt-red/40 px-1.5 py-0.5 rounded">
          EXTRA lên đến 14%
        </span>
        <span className="shrink-0 text-[10px] text-[#b77b00] bg-[#fff8e1] px-1.5 py-0.5 rounded">
          Bonus Hoàn tiền
        </span>
      </div>

      {/* Price block */}
      <section className="bg-white px-3 pt-2.5 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-white bg-tt-red px-1.5 py-0.5 rounded">
            -{off}%
          </span>
          <span className="text-2xl font-bold text-tt-red">
            {formatVND(product.price)}
          </span>
          {product.flashSale && (
            <div className="ml-auto flex items-center gap-1 bg-tt-red text-white text-[11px] font-bold px-2 py-1 rounded-full">
              <span>⚡ Flash Sale</span>
              <span className="font-mono">
                {hh}:{mm}:{ss}
              </span>
            </div>
          )}
        </div>
        <div className="mt-1 text-gray-400 text-[12px] line-through">
          {formatVND(product.originalPrice)}
        </div>

        {/* PayLater */}
        <div className="mt-2 flex items-center gap-2 text-[12px] text-gray-700 border-t border-gray-100 pt-2">
          <span className="text-[11px] bg-gray-100 px-1.5 py-0.5 rounded font-medium">💳</span>
          <span>
            {formatVND(Math.round(product.price / 12))} x 12 tháng với{" "}
            <span className="font-semibold">PayLater</span>
          </span>
          <span className="ml-auto text-tt-red text-[11px] font-medium">Tối đa 30 triệu đ</span>
          <ChevronRight size={14} className="text-gray-400" />
        </div>

        {/* Voucher row */}
        <div className="mt-2 flex items-center gap-1 overflow-x-auto no-scrollbar">
          <span className="shrink-0 text-[11px] text-tt-red bg-tt-red/10 px-1.5 py-0.5 rounded">
            🎯 Giảm đến 99%!
          </span>
          <span className="shrink-0 text-[11px] text-tt-red bg-tt-red/10 px-1.5 py-0.5 rounded">
            🎟 Giảm 15K
          </span>
          <span className="shrink-0 text-[11px] text-[#b77b00] bg-[#fff8e1] px-1.5 py-0.5 rounded">
            🪙 Tiết kiệm 8% với thưởng
          </span>
          <ChevronRight size={14} className="text-gray-400 shrink-0 ml-auto" />
        </div>
      </section>

      {/* Product name */}
      <section className="bg-white px-3 pt-2 pb-3 mt-2">
        <div className="flex items-start gap-2">
          <span className="shrink-0 text-[10px] bg-green-600 text-white px-1 py-0.5 rounded font-bold">
            HÀNG VIỆT
          </span>
          <h1 className="text-[14px] leading-[18px] text-gray-900 flex-1">
            {product.name}
          </h1>
          <button className="shrink-0">
            <Bookmark size={18} className="text-gray-500" />
          </button>
        </div>
        <div className="mt-2 flex items-center gap-1 text-[12px] text-gray-700">
          <Star size={12} className="fill-tt-yellow text-tt-yellow" />
          <span className="font-semibold">{product.rating.toFixed(1)}</span>
          <span className="text-gray-500">({product.reviews})</span>
          <span className="text-gray-300 mx-1">|</span>
          <span className="text-gray-500">Đã bán {product.sold}</span>
        </div>
      </section>

      {/* Share to earn */}
      <section className="bg-white px-3 py-2.5 mt-2 flex items-center gap-2 border-t border-gray-100">
        <div className="w-6 h-6 rounded-full bg-tt-yellow/30 flex items-center justify-center text-xs">
          💰
        </div>
        <div className="text-[12px] flex-1">
          Chia sẻ để nhận{" "}
          <span className="text-tt-red font-bold">
            {formatVND(Math.round(product.price * 0.09))}
          </span>{" "}
          cho mỗi lượt bán
          <div className="text-[11px] text-gray-500">9% hoa hồng</div>
        </div>
        <ChevronRight size={16} className="text-gray-400" />
      </section>

      {/* Shipping */}
      <section className="bg-white mt-2 px-3 py-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <div className="shrink-0 min-w-[180px] bg-gradient-to-r from-tt-cyan/10 to-white rounded-lg p-2 flex items-center gap-2">
            <span>🚚</span>
            <div className="flex-1">
              <div className="text-[12px] font-semibold">Giảm 140K đ</div>
              <div className="text-[10px] text-gray-500">cho đơn trên 250K đ</div>
            </div>
            <button className="relative text-[11px] bg-tt-cyan/20 text-[#0c9c94] font-semibold px-2 py-1 rounded">
              Nhận
              <span className="absolute -top-1 -right-1 bg-tt-red text-white text-[9px] px-1 rounded leading-tight">
                x30
              </span>
            </button>
          </div>
          <div className="shrink-0 min-w-[170px] bg-gradient-to-r from-tt-cyan/10 to-white rounded-lg p-2 flex items-center gap-2">
            <span>🚚</span>
            <div className="flex-1">
              <div className="text-[12px] font-semibold">Giao nhanh 2h</div>
              <div className="text-[10px] text-gray-500">cho nội thành HN, HCM</div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2 text-[13px]">
            <span className="text-tt-red font-bold">PayLater</span>
            <span className="text-[11px] bg-tt-red/10 text-tt-red px-1.5 py-0.5 rounded">
              Giảm đến 99%!
            </span>
          </div>
          <ChevronRight size={14} className="text-gray-400" />
        </div>
      </section>

      {/* Shop */}
      <section className="bg-white mt-2 px-3 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-200 to-green-500 flex items-center justify-center text-white font-bold">
          {product.shop[0]}
        </div>
        <div className="flex-1">
          <div className="text-[13px] font-semibold flex items-center gap-1">
            {product.shop}
            <span className="text-[10px] bg-green-100 text-green-700 px-1 rounded">Mall</span>
          </div>
          <div className="text-[11px] text-gray-500">
            99% phản hồi trong 24 giờ • 85% vận chuyển trong 48 giờ
          </div>
        </div>
        <button className="text-[12px] text-gray-700 border border-gray-300 rounded-full px-3 py-1">
          Xem shop
        </button>
      </section>

      {/* Videos */}
      <section className="bg-white mt-2 px-3 py-3">
        <h3 className="text-[14px] font-semibold">Video từ nhà sáng tạo (4)</h3>
        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-2">
          {product.images.concat(product.images).slice(0, 4).map((src, i) => (
            <div
              key={i}
              className="relative shrink-0 w-[110px] aspect-[3/4] rounded-lg overflow-hidden bg-gray-200"
            >
              <Image src={src} alt="video" fill sizes="110px" className="object-cover" />
              <div className="absolute top-1 left-1 bg-black/60 rounded-full w-5 h-5 flex items-center justify-center">
                <Play size={10} className="text-white fill-white" />
              </div>
              <div className="absolute bottom-1 left-1 right-1 text-white text-[10px] font-medium line-clamp-2 drop-shadow">
                Cây Kiểng Sài Gòn
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white mt-2 px-3 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-semibold">
            Đánh giá của khách hàng ({product.reviews})
          </h3>
          <button className="text-[12px] text-gray-600 flex items-center">
            Xem thêm <ChevronRight size={14} />
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold">{product.rating.toFixed(1)}</span>
          <span className="text-xs text-gray-500">/5</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                size={14}
                className={
                  n <= Math.round(product.rating)
                    ? "fill-tt-yellow text-tt-yellow"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
        </div>
        <div className="mt-3 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-200" />
            <span className="text-[12px] font-medium">K**j ** C**u</span>
          </div>
          <div className="flex gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} size={11} className="fill-tt-yellow text-tt-yellow" />
            ))}
          </div>
          <div className="text-[11px] text-gray-500 mt-1">Mặt hàng: Mặc định</div>
          <p className="text-[12px] mt-1">
            <span className="text-gray-500">Chất lượng sản phẩm:</span> Cây đẹp được shop
            hỗ trợ nhiệt tình, sẽ quay lại mua lần sau :))
          </p>
          <div className="relative w-20 h-20 mt-2 rounded bg-gray-100 overflow-hidden">
            <Image src={product.images[0]} alt="review" fill sizes="80px" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Same shop */}
      <section className="bg-white mt-2 px-3 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-semibold">Xem thêm sản phẩm từ cửa hàng này</h3>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-2">
          <div className="shrink-0 w-[100px] rounded-lg overflow-hidden bg-gradient-to-br from-tt-red to-tt-orange p-2 text-white">
            <div className="absolute text-[10px] bg-black/20 px-1 rounded">x68</div>
            <div className="text-base font-bold mt-2">Giảm 25%</div>
            <div className="text-[10px] opacity-90 mt-1 leading-tight">
              Không có mức chi tiêu tối thiểu
            </div>
            <button className="mt-2 w-full text-[11px] bg-white text-tt-red font-bold py-1 rounded">
              Nhận
            </button>
          </div>
          {sameShop.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="shrink-0 w-[100px] bg-white"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image src={p.images[0]} alt={p.name} fill sizes="100px" className="object-cover" />
              </div>
              <div className="text-[13px] font-bold text-tt-red mt-1">{formatVND(p.price)}</div>
              <div className="text-[10px] text-tt-red">-{percentOff(p.originalPrice, p.price)}%</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Giới thiệu về sản phẩm */}
      <section className="bg-white mt-2 px-3 py-3">
        <h3 className="text-[14px] font-semibold">Giới thiệu về sản phẩm</h3>
        <div className="mt-2">
          <h4 className="text-[12px] text-gray-500">Chi tiết</h4>
          <dl className="mt-1 text-[13px] space-y-1.5">
            <div className="flex">
              <dt className="w-28 text-gray-500">Khu vực xuất xứ</dt>
              <dd>{product.origin}</dd>
            </div>
            <div className="flex">
              <dt className="w-28 text-gray-500">Vật liệu</dt>
              <dd>{product.material}</dd>
            </div>
            <div className="flex">
              <dt className="w-28 text-gray-500">Loại trang trí</dt>
              <dd>{product.decorType}</dd>
            </div>
            <div className="flex">
              <dt className="w-28 text-gray-500">Số lượng trên mỗi gói</dt>
              <dd>1</dd>
            </div>
          </dl>
          <button className="mt-2 text-[12px] text-tt-red">Xem thêm</button>
        </div>
        <div className="mt-3 border-t border-gray-100 pt-3">
          <h4 className="text-[13px] font-semibold">Mô tả</h4>
          <pre className="whitespace-pre-wrap text-[12px] text-gray-800 mt-1 font-sans">
            {product.description}
          </pre>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded">
              2.2K+ lượt xem trong 30 ngày
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded">
              21.2K+ cửa hàng mua lại
            </span>
          </div>
          <div className="relative w-full h-40 mt-2 rounded-lg overflow-hidden">
            <Image src={product.images[1] || product.images[0]} alt="desc" fill sizes="480px" className="object-cover" />
          </div>
          <button className="mt-2 w-full text-center text-[12px] text-tt-red border-t border-gray-100 pt-2 flex items-center justify-center gap-1">
            Xem thêm <ChevronRight size={14} />
          </button>
        </div>
      </section>

      {/* Có thể bạn cũng thích */}
      <section className="mt-2 px-3 py-3">
        <h3 className="text-[14px] font-semibold mb-2">Có thể bạn cũng thích</h3>
        <div className="grid grid-cols-2 gap-2">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Back to top */}
      <div className="flex justify-center py-3">
        <button
          onClick={() => typeof window !== "undefined" && window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center"
        >
          <ArrowUp size={18} />
        </button>
      </div>

      {/* Sticky Buy Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-100 px-2 py-2 flex items-center gap-2 z-40">
        <button className="flex flex-col items-center justify-center w-11 text-gray-700">
          <Store size={18} />
          <span className="text-[9px]">Cửa hàng</span>
        </button>
        <button className="relative flex flex-col items-center justify-center w-11 text-gray-700">
          <MessageCircle size={18} />
          <span className="absolute -top-0.5 right-1 bg-tt-red text-white text-[9px] px-1 rounded leading-tight">
            7
          </span>
          <span className="text-[9px]">Chat</span>
        </button>
        <button
          onClick={handleAdd}
          className="w-11 h-11 rounded-full bg-tt-red/10 text-tt-red flex items-center justify-center"
        >
          <ShoppingCart size={20} />
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 h-11 rounded-full bg-gradient-to-r from-tt-red to-[#ff3d5b] text-white font-bold text-sm flex flex-col items-center justify-center leading-tight pulse-red"
        >
          <span>Mua ngay</span>
          {product.flashSale && (
            <span className="text-[10px] font-medium">Flash Sale {formatVND(product.price)}</span>
          )}
        </button>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[13px] px-4 py-2 rounded-full z-50">
          Đã thêm vào giỏ hàng ✓
        </div>
      )}
    </div>
  );
}
