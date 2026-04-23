import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Star, Store, MessageCircle } from "lucide-react";
import { getProductsByShopSlug, shopSlug, products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

export async function generateMetadata(props: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const items = getProductsByShopSlug(slug);
  const shopName = items[0]?.shop ?? "Shop";
  return {
    title: `${shopName} | PlantShop VN`,
    description: `Tất cả sản phẩm của ${shopName} — cây cảnh, cây phong thuỷ, quà tặng ý nghĩa. ${items.length} sản phẩm, freeship toàn quốc.`,
  };
}

export async function generateStaticParams() {
  const slugs = new Set(products.map((p) => shopSlug(p.shop)));
  return Array.from(slugs).map((slug) => ({ slug }));
}

export default async function ShopPage(props: PageProps<"/shop/[slug]">) {
  const { slug } = await props.params;
  const items = getProductsByShopSlug(slug);
  if (items.length === 0) notFound();

  const shopName = items[0].shop;
  const totalSold = items.reduce((s, p) => s + p.sold, 0);
  const avgRating = items.reduce((s, p) => s + p.rating, 0) / items.length;
  const totalReviews = items.reduce((s, p) => s + p.reviews, 0);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white px-3 py-2.5 flex items-center gap-2 border-b border-gray-100">
        <Link href="/" className="w-8 h-8 flex items-center justify-center -ml-1">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="flex-1 text-base font-semibold truncate">{shopName}</h1>
        <button className="w-8 h-8 flex items-center justify-center text-gray-700">
          <MessageCircle size={20} />
        </button>
      </header>

      {/* Shop banner */}
      <section className="bg-gradient-to-br from-tt-red via-[#ff3d5b] to-[#ff6e47] text-white px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-white/25 border-2 border-white flex items-center justify-center text-2xl font-bold">
            {shopName[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-lg truncate flex items-center gap-1">
              {shopName}
              <span className="text-[10px] bg-white/25 px-1 rounded">Mall</span>
            </div>
            <div className="text-[12px] opacity-90 flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-0.5">
                <Star size={12} className="fill-white" /> {avgRating.toFixed(1)}
              </span>
              <span>•</span>
              <span>{totalReviews.toLocaleString()} đánh giá</span>
            </div>
          </div>
          <button className="bg-white text-tt-red text-xs font-semibold px-3 py-1.5 rounded-full">
            + Theo dõi
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4 text-center">
          <Stat label="Sản phẩm" value={items.length.toString()} />
          <Stat label="Đã bán" value={totalSold >= 1000 ? `${(totalSold / 1000).toFixed(1)}k` : totalSold.toString()} />
          <Stat label="Phản hồi" value="99%" />
          <Stat label="Giao hàng" value="48h" />
        </div>
      </section>

      {/* Shop intro */}
      <section className="bg-white px-3 py-3 border-b border-gray-100">
        <div className="flex items-start gap-2 text-[12px] text-gray-700">
          <Store size={14} className="text-tt-red shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Chuyên cung cấp cây cảnh chất lượng cao — cam kết cây khoẻ, lá đẹp, bao
            sống 7 ngày. Tặng kèm hướng dẫn chăm & phân bón. Freeship toàn quốc đơn từ
            250K.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white px-3 py-2 flex gap-2 overflow-x-auto no-scrollbar border-b border-gray-100 sticky top-[52px] z-20">
        {["Tất cả", "Bán chạy", "Mới nhất", "Giá tăng", "Giá giảm"].map((f, i) => (
          <button
            key={f}
            className={`shrink-0 text-[12px] px-3 py-1.5 rounded-full ${
              i === 0 ? "bg-tt-red text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {f}
          </button>
        ))}
      </section>

      {/* Products */}
      <div className="grid grid-cols-2 gap-2 p-3">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="text-center text-xs text-gray-400 py-4">
        — Đã xem hết {items.length} sản phẩm của {shopName} —
      </div>

      <Footer />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-bold text-base">{value}</div>
      <div className="text-[10px] opacity-90">{label}</div>
    </div>
  );
}
