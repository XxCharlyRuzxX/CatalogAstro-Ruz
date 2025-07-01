import { useEffect, useState } from "react";
import MyProductsList from "./MyProductsList";
import OrderComponent from "./OrderComponet";
import type { Product } from "@/lib/interfaces";
import { getSelectedProducts } from "@/utils/selectedProducts";

export default function MyProductsComponent() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const selected = getSelectedProducts();
    setProducts(selected);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
      <div className="md:col-span-3">
        <MyProductsList products={products} setProducts={setProducts} />
      </div>

      <div className="flex flex-col items-center justify-start gap-6 md:col-span-2">
        <OrderComponent productsNumber={products.length}/>
        <img
          src="/icons/supermarket.svg"
          alt="Catálogo"
          width={350}
          height={350}
          className="object-contain"
        />
      </div>
    </div>
  );
}
