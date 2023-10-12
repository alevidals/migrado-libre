import type { Category } from "@/lib/types";

import { getProducts } from "./getProducts";

interface CategoryInfoResult {
  path_from_root: {
    id: string;
    name: string;
  }[];
}

async function fetchCategoryInfo(categoryId: string) {
  try {
    const response = await fetch(`https://api.mercadolibre.com/categories/${categoryId}`);

    if (!response.ok) throw new Error("Unexpected error getting category info");

    const { path_from_root: pathFromRoot } = (await response.json()) as CategoryInfoResult;

    return pathFromRoot;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Unexpected error getting category info");
  }
}

export async function getCategories() {
  try {
    const products = await getProducts();

    const productIds = Array.from(new Set(products.map((product) => product.categoryId)));

    const promises = productIds.map((productId) => fetchCategoryInfo(productId));

    const productsCategories = await Promise.all(promises);

    const categories: Category[] = [];

    productsCategories.forEach((productCategories) => {
      productCategories.forEach((productCategory, index) => {
        const parentId = productCategories[index - 1]?.id;

        if (categories.some((category) => category.id === productCategory.id)) return;

        categories.push({
          id: productCategory.id,
          name: productCategory.name,
          parentId,
        });
      });
    });

    return categories;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Unexpected error getting categories");
  }
}
