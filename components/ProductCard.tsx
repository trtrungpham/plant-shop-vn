import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Product } from "@/lib/products";
import { formatVND, percentOff } from "@/lib/format";
import WishlistButton from "@/components/WishlistButton";

export default function ProductCard({ product }: { product: Product }) {
  const off = percentOff(product.originalPrice, product.price);

  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-white rounded-lg overflow-hidden block active:opacity-80 transition"
    >
      <div className="relative aspect-square bg-gray-50">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 480px) 50vw, 240px"
          className="object-cover"
        />
        {product.flashSale && (
          <div className="absolute top-1.5 left-1.5 bg-gradient-to-r from-tt-red to-tt-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            ⚡ FLASH SALE
          </div>
        )}
        {product.freeship && (
          <div className="absolute bottom-1.5 left-1.5 bg-tt-cyan/20 text-[#0c9c94] text-[10px] font-semibold px-1.5 py-0.5 rounded">
            XTRA Freeship
          </div>
        )}
        <div className="absolute top-1 right-1 w-7 h-7 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm">
          <WishlistButton id={product.id} size={15} />
        </div>
      </div>
      <div className="p-2">
        <h3 className="text-[13px] leading-[16px] line-clamp-2 text-gray-900 min-h-[32px]">
          {product.name}
        </h3>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-tt-red font-bold text-[15px]">
            {formatVND(product.price)}
          </span>
          {off > 0 && (
            <span className="text-tt-red text-[10px] font-semibold bg-tt-red/10 px-1 rounded">
              -{off}%
            </span>
          )}
        </div>
        {product.originalPrice > product.price && (
          <div className="text-gray-400 text-[11px] line-through">
            {formatVND(product.originalPrice)}
          </div>
        )}
        <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-500">
          <div className="flex items-center gap-0.5">
            <Star size={11} className="fill-tt-yellow text-tt-yellow" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
          <span>•</span>
          <span>Đã bán {product.sold >= 1000 ? `${(product.sold / 1000).toFixed(1)}k` : product.sold}</span>
        </div>
      </div>
    </Link>
  );
}
