
import type { Product } from "@lib/interfaces/product";
import { type GetProductsParams, productService } from "@lib/service/productService";
import { useEffect, useState } from "react";
import ProductCard from "../catalog/ProductCardReact";

const params: GetProductsParams = {
  filtredbyCategory: "Populares",
};

export function PopularProducts() {

    const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const popularProducts: Product[] = await productService.getAll(params);
      setProducts(popularProducts);
    };
    fetchProducts();
  }, []);

  return(

    <section className="bg-[#F1F6F6] px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-7xl">
    <div className="mb-10 text-center">
      <p className ="mb-2 text-[11px] uppercase tracking-[0.35em] text-[#7D7A73]">
        Lo mas popular
      </p>
      <h2 className="text-3xl font-light text-[#1E1E1C] sm:text-4xl">
        En Tendencia
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6B6A66] sm:text-base">
        Una selección de nuestros productos populares con una presentación más limpia y actual.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-10">
      {products.slice(0, 8).map((product) => (
        <ProductCard key={product.idProduct} product={product} />
      ))}
    </div>
  </div>
</section>
    )
}