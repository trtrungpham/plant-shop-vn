import Link from "next/link";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";
import { categories, getProductsByCategory } from "@/lib/products";
import Image from "next/image";

export default function CategoryIndexPage() {
  return (
    <>
      <MobileHeader variant="simple" title="Danh mục" />
      <div className="grid grid-cols-2 gap-2 p-3">
        {categories.map((c) => {
          const first = getProductsByCategory(c.slug)[0];
          return (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="bg-white rounded-xl p-3 flex flex-col"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{c.icon}</span>
                <span className="text-[13px] font-semibold">{c.name}</span>
              </div>
              {first && (
                <div className="relative mt-2 aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={first.images[0]}
                    alt={c.name}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
              )}
            </Link>
          );
        })}
      </div>
      <Footer />
    </>
  );
}
