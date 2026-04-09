import { e as error, p as prisma, s as success } from './responseUtils_k5VHtJvg.mjs';

function buildCategoryData(data) {
  return {
    ...data.id && { id: data.id },
    name: data.name,
    productsCategory: Array.isArray(data.productsCategory) && data.productsCategory.length > 0 ? {
      connect: data.productsCategory.map((prod) => ({
        idProduct: prod.idProduct
      }))
    } : {
      connect: []
    }
  };
}

async function GET({ request }) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const orderBy = searchParams.get("orderBy") === "name" ? "name" : "id";
  const orderType = searchParams.get("orderType") === "desc" ? "desc" : "asc";
  try {
    if (id) {
      const category = await prisma.category.findUnique({
        where: { id },
        include: { productsCategory: true }
      });
      if (!category) {
        return error({ error: "Categoría no encontrada" }, "404");
      }
      return success(category, 200);
    }
    const categories = await prisma.category.findMany({
      include: { productsCategory: true },
      orderBy: { [orderBy]: orderType }
    });
    return success(categories, 200);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return error(
      { error: `Error al obtener las categorías: ${message}` }
    );
  }
}
async function POST({ request }) {
  const data = buildCategoryData(await request.json());
  try {
    await prisma.category.create({
      data,
      include: { productsCategory: true }
    });
    return success({ message: "Producto creado exitosamente" }, 201);
  } catch (e) {
    console.error("Error al crear la categoría:", e);
    const message = e instanceof Error ? e.message : JSON.stringify(e);
    return error({ error: `Ocurrió un error: ${message}` });
  }
}
async function PUT({ request }) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const data = buildCategoryData(await request.json());
  if (!id) {
    return error({ error: "ID de categoría es requerido" }, "400");
  }
  try {
    await prisma.category.update({
      where: { id },
      data,
      include: { productsCategory: true }
    });
    return success(data, 200);
  } catch (e) {
    return error({ error: `Error al actualizar la categoría: ${e}`, status: 500 });
  }
}
async function DELETE({ request }) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return error({ error: "ID de categoría es requerido" }, "400");
  }
  try {
    await prisma.category.delete({
      where: { id }
    });
    return success({ message: "Categoría eliminada exitosamente" }, 200);
  } catch (e) {
    return error({ error: `Error al eliminar la categoría: ${e}` }, "500");
  }
}
async function PATCH({ request }) {
  try {
    const body = await request.json();
    const { categoryId, productIds } = body;
    if (!categoryId || !Array.isArray(productIds)) {
      return error(
        { error: "categoryId y productIds son requeridos y válidos" },
        "400"
      );
    }
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });
    if (!category) {
      return error({ error: "Categoría no encontrada" }, "404");
    }
    const updated = await prisma.category.update({
      where: { id: categoryId },
      data: {
        productsCategory: {
          set: productIds.map((idProduct) => ({ idProduct }))
        }
      },
      include: { productsCategory: true }
    });
    return success(updated, 200);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return error({ error: `Error al asignar productos: ${message}` }, "500");
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PATCH,
  POST,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
