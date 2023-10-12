import { ProductsList } from "@/components/ProductsList";
import { getProducts } from "@/services/getProducts";

export default async function Page({params: {segments}}: {params: {segments?: string[]}}) {
  const category = segments?.[0];

  const products = await getProducts(category);

  return <ProductsList products={products} />;
}
