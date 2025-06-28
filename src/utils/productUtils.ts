type RawCategory = { id: string };

export type RawProductData = {
  idProduct?: string;
  nameProduct: string;
  imgProduct: string;
  priceProduct: number;
  description: string;
  brand: string;
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
    categoriesProduct: {
      connect: data.categoriesProduct.map((cat) => ({ id: cat.id })),
    },
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
    categoriesProduct: {
      set: [],
      connect: data.categoriesProduct.map((cat) => ({ id: cat.id })),
    },
  };
}