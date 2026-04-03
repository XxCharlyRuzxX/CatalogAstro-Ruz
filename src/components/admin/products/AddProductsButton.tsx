import { useState } from "react";
import type { ProductDTO } from "@/lib/interfaces";
import { Plus } from "lucide-react";
import ProductFormModal from "./ProductFormModal";

interface AddProductsButtonProps {
  readonly onSubmit: (product: ProductDTO) => Promise<void>;
}

export default function AddProductsButton({
  onSubmit,
}: AddProductsButtonProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] transition sm:text-sm bg-[#2C3E3A] text-white shadow-[0_8px_20px_rgba(44,62,58,0.18)] hover:bg-[#2C3E3A]/90`}
      >
        <Plus className="h-4 w-4" />
        Añadir producto
      </button>

      <ProductFormModal
        isOpen={openModal}
        CloseModal={() => setOpenModal(false)}
        onSubmit={onSubmit}
        title="Añadir nuevo producto"
        submitLabel="Crear producto"
      />
    </>
  );
}
