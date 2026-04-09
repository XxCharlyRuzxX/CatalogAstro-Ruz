const BASE_URL = "/api/products";
const WINDOW_LOCATION = "http://localhost:4321";
function buildQueryURL(base, params) {
  const url = new URL(base, WINDOW_LOCATION);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== void 0 && value !== null && value !== "") {
        url.searchParams.append(key, value);
      }
    });
  }
  return url.toString();
}
const productService = {
  async getAll(params) {
    const url = buildQueryURL(BASE_URL, params);
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener los productos");
    return res.json();
  },
  async getById(params) {
    const url = buildQueryURL(BASE_URL, params);
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener producto por ID");
    return res.json();
  },
  async postProducts(products) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(products)
    });
    if (!res.ok) throw new Error("Error al crear los productos");
    return res.json();
  },
  async putProduct(product, id) {
    const url = buildQueryURL(BASE_URL, { id });
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });
    if (!res.ok) throw new Error("Error al actualizar el producto");
    return res.json();
  },
  async deleteProduct(id) {
    const url = buildQueryURL(BASE_URL, { id });
    const res = await fetch(url, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Error al eliminar el producto");
    return res.json();
  }
};

export { productService as p };
