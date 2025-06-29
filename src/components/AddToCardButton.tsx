import type { Product } from "@/lib/interfaces";
import { useState } from "react";

type Props = { readonly product: Product };

export default function AddToCartButton({ product }: Props) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    const stored = localStorage.getItem("productsSelected");
    const current: Product[] = stored ? JSON.parse(stored) : [];

    if (!current.find((p) => p.idProduct === product.idProduct)) {
      current.push(product);
      localStorage.setItem("productsSelected", JSON.stringify(current));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="text-white bg-(--primary-green) w-full max-w-sm px-4 py-2 hover:bg-lime-800 transition-colors duration-300"

    >
      {added ? "¡Agregado!" : "Añadir al carrito"}
    </button>
  );
}
