import type { Product, ProductDTO } from "../interfaces";

const BASE_URL = "/api/products";

export type GetProductsParams = {
  id?: string;
  orderBy?: string;
  orderType?: "asc" | "desc";
  filtredbyCategory?: string;
  searchTerm?: string;
};

function buildQueryURL(base: string, params?: GetProductsParams): string {
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });
  }

  const query = searchParams.toString();
  return query ? `${base}?${query}` : base;
}

function buildFinalURL(path: string, origin?: string): string {
  return origin ? `${origin}${path}` : path;
}

export const productService = {
  async getAll(params?: GetProductsParams, origin?: string) {
    const path = buildQueryURL(BASE_URL, params);
    const url = buildFinalURL(path, origin);

    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener los productos");

    return res.json() as Promise<Product[]>;
  },

  async getById(id: string, origin?: string) {
    const path = buildQueryURL(BASE_URL, { id });
    const url = buildFinalURL(path, origin);

    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener el producto");

    return res.json() as Promise<Product>;
  },

  async create(product: ProductDTO, origin?: string) {
    const url = buildFinalURL(BASE_URL, origin);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!res.ok) throw new Error("Error al crear el producto");

    return res.json() as Promise<Product>;
  },

  async update(id: string, product: ProductDTO, origin?: string) {
    const path = buildQueryURL(BASE_URL, { id });
    const url = buildFinalURL(path, origin);

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

  async delete(id: string, origin?: string) {
    const path = buildQueryURL(BASE_URL, { id });
    const url = buildFinalURL(path, origin);

    const res = await fetch(url, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Error al eliminar el producto");

    return res.json();
  },
};