import type { Product } from "@/lib/interfaces";
import { categoryService } from "@/lib/service/categoryService";

type RawProductData = { idProduct: string };

type RawCategory = {
  id?: string;
  name: string;
  productsCategory: RawProductData[];
};

export function buildCategoryData(data: RawCategory) {
  return {
    ...(data.id && { id: data.id }),
    name: data.name,
    productsCategory: Array.isArray(data.productsCategory) && data.productsCategory.length > 0
      ? {
          connect: data.productsCategory.map((prod) => ({
            idProduct: prod.idProduct,
          })),
        }
      : {
          connect: [],
        },
  };
}

export function buildUpdateCategoryData(data: RawCategory) {
  return {
    ...(data.id && { id: data.id }),
    name: data.name,
    productsCategory: {
      set: [],
      connect: data.productsCategory.map((prod) => ({
        idProduct: prod.idProduct,
      })),
    },
  };
}

export async function getProductsByOrderFirstCategorySelected(
  idCategory: string
): Promise<Product[]> {
  let orderedProducts: Product[] = [];

  try {
    const selectedCategory = await categoryService.getById(idCategory);
    const selectedProducts = selectedCategory?.productsCategory || [];
    const allCategories = await categoryService.getAll();
    const otherProducts: Product[] = allCategories
      .filter((cat) => cat.id !== idCategory)
      .flatMap((cat) => cat.productsCategory || []);
    orderedProducts = [...selectedProducts, ...otherProducts];
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return orderedProducts;
}

