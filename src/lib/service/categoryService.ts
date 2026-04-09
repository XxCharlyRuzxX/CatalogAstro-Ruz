import type { Category, CategoryDTO } from "../interfaces";

const BASE_URL = "/api/categories";

export type GetCategoriesParams = {
  id?: string;
  orderBy?: "name" | "id";
  orderType?: "asc" | "desc";
};

function buildQueryURL(base: string, params?: GetCategoriesParams): string {
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
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

export const categoryService = {
  async getAll(params?: GetCategoriesParams, origin?: string): Promise<Category[]> {
    const path = buildQueryURL(BASE_URL, params);
    const url = buildFinalURL(path, origin);

    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener las categorías");

    return res.json();
  },

  async getById(id: string, origin?: string): Promise<Category | null> {
    const path = buildQueryURL(BASE_URL, { id });
    const url = buildFinalURL(path, origin);

    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener la categoría");

    return res.json();
  },

  async postCategory(category: CategoryDTO, origin?: string): Promise<Category> {
    const url = buildFinalURL(BASE_URL, origin);

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });

    if (!res.ok) throw new Error("Error al crear la categoría");
    return res.json();
  },

  async putCategory(id: string, category: Category, origin?: string): Promise<Category> {
    const path = buildQueryURL(BASE_URL, { id });
    const url = buildFinalURL(path, origin);

    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });

    if (!res.ok) throw new Error("Error al actualizar la categoría");
    return res.json();
  },

  async assignProductsToCategory(
    categoryId: string,
    productIds: string[],
    origin?: string
  ) {
    const url = buildFinalURL(BASE_URL, origin);

    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryId, productIds }),
    });

    if (!res.ok) throw new Error("Error al asignar productos a la categoría");
    return res.json();
  },

  async deleteCategory(id: string, origin?: string): Promise<{ message: string }> {
    const path = buildQueryURL(BASE_URL, { id });
    const url = buildFinalURL(path, origin);

    const res = await fetch(url, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar la categoría");

    return res.json();
  },
};