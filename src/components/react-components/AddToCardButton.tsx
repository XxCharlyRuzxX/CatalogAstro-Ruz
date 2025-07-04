import type { Product } from "@/lib/interfaces";
import { toast } from "react-toastify";

type Props = { readonly product: Product };

export default function AddToCartButton({ product }: Props) {
  const handleAddToCart = () => {
    const stored = localStorage.getItem("productsSelected");
    const current: Product[] = stored ? JSON.parse(stored) : [];

    if (!current.find((p) => p.idProduct === product.idProduct)) {
      current.push(product);
      localStorage.setItem("productsSelected", JSON.stringify(current));

      toast.success(`"${product.nameProduct}" añadido al carrito`);
    } else {
      toast.info(`"${product.nameProduct}" ya está en el carrito`);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="text-white bg-(--primary-green) w-full px-4 py-2 hover:bg-lime-800 transition-colors duration-300"
      >
      Añadir al carrito
    </button>
  );
}
