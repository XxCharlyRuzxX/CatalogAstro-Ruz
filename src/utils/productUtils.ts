type RawCategory = { id: string };

export type RawProductData = {
  idProduct?: string;
  nameProduct: string;
  imgProduct: string;
  priceProduct: number;
  description: string;
  brand: string;
  stock: number;
  categoriesProduct: RawCategory[];
};

export function buildProductData(data: RawProductData) {
  return {
    ...(data.idProduct && { idProduct: data.idProduct }),
    nameProduct: data.nameProduct,
    imgProduct: data.imgProduct,
    priceProduct: data.priceProduct,
    description: data.description,
    brand: data.brand,
    stock: data.stock,
    ...(data.categoriesProduct?.length && {
      categoriesProduct: {
        connect: data.categoriesProduct.map((cat) => ({ id: cat.id })),
      },
    }),
  };
}

export function buildUpdateProductData(data: RawProductData) {
  return {
    ...(data.idProduct && { idProduct: data.idProduct }),
    nameProduct: data.nameProduct,
    imgProduct: data.imgProduct,
    priceProduct: data.priceProduct,
    description: data.description,
    brand: data.brand,
    stock: data.stock,
    categoriesProduct: {
      set: [],
      connect: data.categoriesProduct.map((cat) => ({ id: cat.id })),
    },
  };
}