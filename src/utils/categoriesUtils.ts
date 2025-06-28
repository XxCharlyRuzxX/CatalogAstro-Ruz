type RawProductData = { idProduct: string };

type RawCategory = {
  id?: string;
  name: string;
  productsCategory: RawProductData[];
};

export function buildCategoryData(data: RawCategory) {
  return {
    ...(data.id && { id: data.id }),
    name: data.name,
    productsCategory: {
      connect: data.productsCategory.map((prod) => ({
        idProduct: prod.idProduct,
      })),
    },
  };
}

export function buildUpdateCategoryData(data: RawCategory) {
  return {
    ...(data.id && { id: data.id }),
    name: data.name,
    productsCategory: {
      set: [],
      connect: data.productsCategory.map((prod) => ({
        idProduct: prod.idProduct,
      })),
    },
  };
}
