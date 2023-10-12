import type { ExternalProduct } from "@/lib/types";

import { BASE_URL, SELLER_ID } from "@/lib/config";

interface Result {
  results: ExternalProduct[];
}

function parseProducts(products: ExternalProduct[]) {
  return products.map((product) => ({
    id: product.id,
    title: product.title,
    permalink: product.permalink,
    categoryId: product.category_id,
    price: product.price,
    thumbnail: product.thumbnail,
    currencyId: product.currency_id,
  }));
}

export async function getProducts(categoryId?: string) {
  try {
    if (!BASE_URL) throw new Error("BASE_URL is not defined");
    if (!SELLER_ID) throw new Error("SELLER_ID is not defined");

    const url = new URL(`${BASE_URL}/sites/MLA/search`);

    url.searchParams.set("seller_id", SELLER_ID);

    if (categoryId) url.searchParams.set("category", categoryId);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unexpected error getting products");
    }

    const { results } = (await response.json()) as Result;

    const products = parseProducts(results);

    return products;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Unexpected error getting products");
  }
}
