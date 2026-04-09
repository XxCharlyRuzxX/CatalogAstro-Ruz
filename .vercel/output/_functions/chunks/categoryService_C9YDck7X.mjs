const BASE_URL = "/api/categories";
const WINDOW_LOCATION = "http://localhost:4321";
function buildQueryURL(base, params) {
  const url = new URL(base, WINDOW_LOCATION);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== void 0 && value !== null) {
        url.searchParams.append(key, value);
      }
    });
  }
  return url.toString();
}
const categoryService = {
  async getAll(params) {
    const url = buildQueryURL(BASE_URL, params);
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener las categorías");
    return res.json();
  },
  async getById(id) {
    const url = buildQueryURL(BASE_URL, { id });
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener la categoría");
    return res.json();
  },
  async postCategory(category) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category)
    });
    if (!res.ok) throw new Error("Error al crear la categoría");
    return res.json();
  },
  async putCategory(id, category) {
    const url = buildQueryURL(BASE_URL, { id });
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category)
    });
    if (!res.ok) throw new Error("Error al actualizar la categoría");
    return res.json();
  },
  async assignProductsToCategory(categoryId, productIds) {
    const res = await fetch(BASE_URL, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryId, productIds })
    });
    if (!res.ok) throw new Error("Error al asignar productos a la categoría");
    return res.json();
  },
  async deleteCategory(id) {
    const url = buildQueryURL(BASE_URL, { id });
    const res = await fetch(url, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar la categoría");
    return res.json();
  }
};

export { categoryService as c };
