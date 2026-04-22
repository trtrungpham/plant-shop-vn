import { notFound } from "next/navigation";
import MobileHeader from "@/components/MobileHeader";
import ProductCard from "@/components/ProductCard";
import { categories, getProductsByCategory } from "@/lib/products";

export default async function CategoryPage(props: PageProps<"/category/[slug]">) {
  const { slug } = await props.params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const list = getProductsByCategory(slug);

  return (
    <>
      <MobileHeader variant="simple" title={category.name} />
      {list.length === 0 ? (
        <div className="text-center text-sm text-gray-500 py-10">
          Chưa có sản phẩm trong danh mục này
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 p-3">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  );
}
