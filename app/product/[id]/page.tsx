import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProduct, products, GLOBAL_HASHTAGS } from "@/lib/products";
import ProductView from "./ProductView";

export async function generateMetadata(props: PageProps<"/product/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const product = getProduct(id);
  if (!product) return { title: "Sản phẩm không tồn tại" };

  const keywords = [
    ...(product.hashtags?.map((h) => h.replace("#", "")) ?? []),
    ...GLOBAL_HASHTAGS.slice(0, 10).map((h) => h.replace("#", "")),
    product.shop,
    product.decorType,
    "cây cảnh",
    "mua cây online",
    "PlantShop VN",
  ];

  return {
    title: `${product.name} | ${product.shop} | PlantShop VN`,
    description: product.description.slice(0, 160).replace(/\n/g, " "),
    keywords,
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160).replace(/\n/g, " "),
      images: product.images.slice(0, 3),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      images: product.images.slice(0, 1),
    },
  };
}

export default async function ProductPage(props: PageProps<"/product/[id]">) {
  const { id } = await props.params;
  const product = getProduct(id);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 6);
  const sameShop = products
    .filter((p) => p.shop === product.shop && p.id !== product.id)
    .slice(0, 4);

  return <ProductView product={product} related={related} sameShop={sameShop} />;
}
