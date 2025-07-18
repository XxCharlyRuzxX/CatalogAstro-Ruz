import type { Product, ProductDTO } from "../interfaces";

const BASE_URL = "/api/products";
const WINDOW_LOCATION = import.meta.env.VITE_API_BASE_URL || "http://localhost:4321"


export type GetProductsParams = {
  id?: string;
  orderBy?: string;
  orderType?: "asc" | "desc";
  filtredbyCategory?: string;
  searchTerm?: string;
};


function buildQueryURL(base: string, params?: GetProductsParams): string {
  const url = new URL(base, WINDOW_LOCATION);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, value);
      }
    });
  }
  return url.toString();
}

export const productService = {
  async getAll(params?: GetProductsParams) {
    const url = buildQueryURL(BASE_URL, params);

    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener los productos");
    return res.json() as Promise<Product[]>;
  },

  async getById(params?: GetProductsParams) {
    const url = buildQueryURL(BASE_URL, params);

    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener producto por ID");
    return res.json() as Promise<Product>;
  },

  async postProducts(products: ProductDTO[]) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    });

    if (!res.ok) throw new Error("Error al crear los productos");
    return res.json() as Promise<Product[]>;
  },

  async putProduct(product : ProductDTO , id : string) {
    const url = buildQueryURL(BASE_URL, { id });
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!res.ok) throw new Error("Error al actualizar el producto");
    return res.json() as Promise<Product>;
  },

  async deleteProduct(id: string) {
    const url = buildQueryURL(BASE_URL, { id });
    const res = await fetch(url, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Error al eliminar el producto");
    return res.json() as Promise<{ message: string }>;
  }
};
