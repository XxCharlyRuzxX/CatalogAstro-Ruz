import type { Product } from "@/lib/interfaces";
import { addProduct } from "@/utils/selectedProducts";
import { Plus } from "lucide-react";

type Props = { readonly product: Product };

export default function AddToCartButton({ product }: Props) {
  const handleAddToCart = () => {
    addProduct(product);
  };
  return (
    <button
      type="button"
      className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
      onClick={handleAddToCart}
    >
      <Plus className="w-5 h-5 text-[#2F3433]" />
    </button>
  );
}
