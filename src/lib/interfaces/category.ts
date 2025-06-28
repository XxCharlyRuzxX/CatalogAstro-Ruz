import type { Product } from "./product";

export type Category = {
  id: string;
  name: string;
  productsCategory? : Product[];
};