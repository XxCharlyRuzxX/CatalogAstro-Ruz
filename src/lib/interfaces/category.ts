import type { Product } from "./product";

export type Category = {
  id: string;
  name: string;
  productsCategory? : Product[];
};

export type ProductWithSelectionToCategory = {
  product: Product;
  selected: boolean;
}

export type CategoryDTO = {
  name: string;
  productsCategory?: Product[];
};