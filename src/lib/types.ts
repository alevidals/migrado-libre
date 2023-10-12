export interface ExternalProduct {
  id: string;
  title: string;
  permalink: string;
  category_id: string;
  price: number;
  thumbnail: string;
  currency_id: string;
}

export interface Product {
  id: string;
  title: string;
  permalink: string;
  categoryId: string;
  price: number;
  thumbnail: string;
  currencyId: string;
}

export interface Category {
  id: string;
  name: string;
  parentId?: string;
}
