import type { Category, CategoryDTO } from "../interfaces";

const BASE_URL = "/api/categories";
const WINDOW_LOCATION = import.meta.env.VITE_API_BASE_URL || "http://localhost:4321"

export type GetCategoriesParams = {
  id?: string;
  orderBy?: "name" | "id";
  orderType?: "asc" | "desc";
};

function buildQueryURL(base: string, params?: GetCategoriesParams): string {
  const url = new URL(base, WINDOW_LOCATION);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });
  }
  return url.toString();
}

export const categoryService = {
  async getAll(params?: GetCategoriesParams): Promise<Category[]> {
    const url = buildQueryURL(BASE_URL, params);
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener las categorías");
    return res.json();
  },

  async getById(id: string): Promise<Category | null> {
    const url = buildQueryURL(BASE_URL, { id });
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener la categoría");
    return res.json();
  },

  async postCategory(category: CategoryDTO): Promise<Category> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    if (!res.ok) throw new Error("Error al crear la categoría");
    return res.json();
  },

  async putCategory(id: string, category: Category): Promise<Category> {
    const url = buildQueryURL(BASE_URL, { id });
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    if (!res.ok) throw new Error("Error al actualizar la categoría");
    return res.json();
  },

  async assignProductsToCategory(categoryId: string, productIds: string[]) {
    const res = await fetch(BASE_URL, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryId, productIds }),
    });

    if (!res.ok) throw new Error("Error al asignar productos a la categoría");
    return res.json();
  },

  async deleteCategory(id: string): Promise<{ message: string }> {
    const url = buildQueryURL(BASE_URL, { id });
    const res = await fetch(url, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar la categoría");
    return res.json();
  },
};
