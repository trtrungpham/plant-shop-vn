import MobileHeader from "@/components/MobileHeader";
import HomeBanner from "@/components/HomeBanner";
import CategoryGrid from "@/components/CategoryGrid";
import FlashSaleBar from "@/components/FlashSaleBar";
import PromoStrip from "@/components/PromoStrip";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { products, getFlashSaleProducts } from "@/lib/products";

export default function HomePage() {
  const flashProducts = getFlashSaleProducts();

  return (
    <>
      <MobileHeader variant="home" />
      <HomeBanner />
      <CategoryGrid />
      <PromoStrip />
      <FlashSaleBar products={flashProducts} />

      <div className="px-3 mt-4 mb-2 flex items-center gap-2">
        <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-tt-red/40" />
        <h2 className="text-sm font-bold text-tt-red px-2">DÀNH RIÊNG CHO BẠN</h2>
        <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-tt-red/40" />
      </div>

      <div className="grid grid-cols-2 gap-2 px-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="text-center text-xs text-gray-400 py-4">— Bạn đã xem hết rồi —</div>
      <Footer />
    </>
  );
}
