import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import ProductView from "./ProductView";

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
