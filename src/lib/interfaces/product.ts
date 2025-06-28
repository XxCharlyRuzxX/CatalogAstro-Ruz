import type { Category } from "./category";

export type Product = {
  idProduct: string;
  nameProduct: string;
  imgProduct: string;
  priceProduct: number;
  description: string;
  brand: string;
  categoriesProduct?: Category[];
}