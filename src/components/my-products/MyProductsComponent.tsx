import { useEffect, useState } from "react";
import MyProductsList from "./MyProductsList";
import { getSelectedProducts } from "@/utils/selectedProducts";
import type { SelectedProduct } from "@/lib/interfaces/selectedProduct";

export default function MyProductsComponent() {
  const [products, setProducts] = useState<SelectedProduct[]>([]);

  useEffect(() => {
    const selected = getSelectedProducts();
    setProducts(selected);
  }, []);

  return (
    <div className="pt-8 min-h-[70vh]">
      <MyProductsList products={products} setProducts={setProducts} />
    </div>
  );
}
