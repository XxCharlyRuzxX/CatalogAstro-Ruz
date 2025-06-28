import { PrismaClient } from "@prisma/client";
import { buildProductData, buildUpdateProductData , type RawProductData} from "../../utils/productUtils"
import { success, error } from "../../utils/responseUtils";

const prisma = new PrismaClient();


export async function GET({ request }: { request: Request }) {
  const { searchParams }  = new URL(request.url);
  const id = searchParams.get('id');
  const allowedOrderFields = ['nameProduct', 'priceProduct', 'idProduct'];
  const rawOrderBy = searchParams.get('orderBy');
  const orderBy = allowedOrderFields.includes(rawOrderBy ?? '') ? rawOrderBy! : 'idProduct';
  const orderType = searchParams.get('orderType') === 'desc' ? 'desc' : 'asc';
  const filtredbyCategory = searchParams.get('filtredbyCategory') ?? 'all';
  const searchTerm = searchParams.get('searchTerm')?.toLowerCase() ?? '';

  try {
    if (id) {
      const product = await prisma.product.findUnique({
        where: { idProduct: id },
        include: { categoriesProduct: true },
      });
      if (!product) {
        return error({ error: "Producto no encontrado", status: 404 });
      }
      return success(product);
    }

    let category = null;
    if (filtredbyCategory !== 'all') {
      category = await prisma.category.findFirst({
        where: {
          OR: [
            { id: filtredbyCategory },
            { name: filtredbyCategory }
          ]
        },
      });
      if (!category) {
        return success([], 200);
      }
    }

    const products = await prisma.product.findMany({
      where: {
        AND: [
          category ? { categoriesProduct: { some: { id: category.id } } } : {},
          searchTerm
          ? {
            OR: [
              { nameProduct: { contains: searchTerm} },
              { description: { contains: searchTerm} },
            ],
          }
        : {}
        ],
      },
      include: { categoriesProduct: true },
      orderBy: {
        [orderBy]: orderType,
      },
    });

    return success(products);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return error({ error: `Error al obtener los productos: ${message}`, status: 500 });
  }
}




export async function POST({ request }: { request: Request }) {
  const body = await request.json();

  const products: RawProductData[] = Array.isArray(body) ? body : [body];
  const productData = products.map(buildProductData);

  try {
    await Promise.all(
      productData.map((data) =>
        prisma.product.create({
          data,
          include: { categoriesProduct: true },
        })
      )
    );

    return success({ message: "Productos creados exitosamente" }, 201);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return error(`Error al crear productos: ${message}`);
  }
}


export async function PUT({ request }: { request: Request }) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const data = buildUpdateProductData(await request.json());
  if (!id){
    return error({ error: "ID del producto es requerido", status: 400 });
  }
  try {
      await prisma.product.update({
      where: { idProduct: id },
      data,
      include: { categoriesProduct: true },
    });
    return success(data);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return error({ error: `Error al actualizar el producto: ${message}` , status: 500 });
  }
}

export async function DELETE({ request }: { request: Request }) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return error({ error: "ID del producto es requerido", status: 400 });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { idProduct: id },
    });
    if (!product) {
      return error({ error: "Producto no encontrado" , status: 404 });
    }
    await prisma.product.delete({ where: { idProduct: id } });
    return success({ message: "Producto eliminado exitosamente" });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return error({ error: `Error al eliminar el producto: ${message}` , status: 500 });
  }
}
