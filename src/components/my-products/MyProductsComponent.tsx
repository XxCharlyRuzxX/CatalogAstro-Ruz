import { useEffect, useState } from "react";
import MyProductsList from "./MyProductsList";
import { syncAndGetCart } from "@/utils/selectedProducts";
import type { SelectedProduct } from "@/lib/interfaces/selectedProduct";

export default function MyProductsComponent() {
  const [products, setProducts] = useState<SelectedProduct[]>([]);

  useEffect(() => {
    syncAndGetCart().then((freshProducts) => {
      setProducts(freshProducts);
    });
  }, []);

  return (
    <div className="pt-8 min-h-[70vh]">
      <MyProductsList products={products} setProducts={setProducts} />
    </div>
  );
}
