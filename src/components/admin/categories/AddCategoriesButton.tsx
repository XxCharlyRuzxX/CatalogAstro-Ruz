import { useState } from "react";
import type { CategoryDTO } from "@/lib/interfaces";
import { Plus } from "lucide-react";
import CategoryFormModal from "./CategoriesFormModal";

interface AddCategoriesButtonProps {
  readonly onSubmit: (category: CategoryDTO) => Promise<void>;
}

export default function AddCategoriesButton({
  onSubmit,
}: AddCategoriesButtonProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2C3E3A] px-5 py-3 text-sm uppercase tracking-[0.12em] text-white transition-all duration-300 hover:scale-[1.01] hover:bg-[#243531]"
      >
        <Plus className="h-4 w-4" />
        Añadir categoría
      </button>

      <CategoryFormModal
        isOpen={openModal}
        CloseModal={() => setOpenModal(false)}
        onSubmit={onSubmit}
      />
    </>
  );
}
