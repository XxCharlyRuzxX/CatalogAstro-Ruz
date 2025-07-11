import { PrismaClient } from '@prisma/client';
import { buildCategoryData } from  "../../utils/categoriesUtils"
import { error, success } from "../../utils/responseUtils";

const prisma = new PrismaClient();


export async function GET({ request }: { request: Request }) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const orderBy = searchParams.get('orderBy') === 'name' ? 'name' : 'id';
  const orderType = searchParams.get('orderType') === 'desc' ? 'desc' : 'asc';

  try {

    if (id){
      const category = await prisma.category.findUnique({
        where: { id: id },
        include: { productsCategory: true },
      });
    if (!category) {
        return error({ error: "Categoría no encontrada" }, "404");
      }
      return success(category, 200);
    }

    const categories = await prisma.category.findMany({
      include: { productsCategory: true },
      orderBy: { [orderBy]: orderType},
    });
    return success(categories, 200);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
    return error({ error: `Error al obtener las categorías: ${message}` },
    );
  }
}

export async function POST({ request }: { request: Request }) {
  const data = buildCategoryData(await request.json());

  try {
    await prisma.category.create({
      data: data,
      include: { productsCategory: true },
    });
    return success({ message: "Producto creado exitosamente" }, 201);
  } catch (e) {
     console.error("Error al crear la categoría:", e);
    const message = e instanceof Error ? e.message : JSON.stringify(e);
    return error({ error: `Ocurrió un error: ${message}` });
  }
}


export async function PUT({ request }: { request: Request }) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const data = buildCategoryData(await request.json());

  if (!id) {
    return error({ error: "ID de categoría es requerido" }, "400");
  }
  try {
    await prisma.category.update({
      where: { id: id },
      data,
      include: { productsCategory: true },
    });
    return success(data, 200);
  } catch (e) {
    return error({ error: `Error al actualizar la categoría: ${e}`,  status: 500 });
  }
}

export async function DELETE({ request }: { request: Request }) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return error({ error: "ID de categoría es requerido" }, "400");
  }

  try {
    await prisma.category.delete({
      where: { id: id },
    });
    return success({ message: "Categoría eliminada exitosamente" }, 200);
  } catch (e) {
    return error({ error: `Error al eliminar la categoría: ${e}` }, "500");
  }
}

export async function PATCH({ request }: { request: Request }) {
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
      where: { id: categoryId },
    });

    if (!category) {
      return error({ error: "Categoría no encontrada" }, "404");
    }
    const updated = await prisma.category.update({
      where: { id: categoryId },
      data: {
        productsCategory: {
          set: productIds.map((idProduct: string) => ({ idProduct })),
        },
      },
      include: { productsCategory: true },
    });

    return success(updated, 200);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return error({ error: `Error al asignar productos: ${message}` }, "500");
  }
}
