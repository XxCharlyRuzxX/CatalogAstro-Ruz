import type { Category } from "@/lib/interfaces";
import { useState } from "react";
import ConfirmationModal from "@/components/react-components/ConfirmationModal";
import { Pencil, Trash2 } from "lucide-react";

interface CategoriesAdminListProps {
  readonly categories?: Category[];
  readonly onEdit: (categoryId: string) => void;
  readonly onDelete: (categoryId: string) => void;
}

export default function CategoriesAdminList({
  onEdit,
  onDelete,
  categories,
}: CategoriesAdminListProps) {
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const handleOpenModalDelete = (categoryId: string) => {
    setCategoryToDelete(categoryId);
    setIsOpenModalDelete(true);
  };

  const handleCancelDelete = () => {
    setIsOpenModalDelete(false);
    setCategoryToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (categoryToDelete) {
      onDelete(categoryToDelete);
      setIsOpenModalDelete(false);
      setCategoryToDelete(null);
    }
  };

  if (!categories || categories.length === 0) {
    return (
      <div className="rounded-[28px] bg-white/80 px-6 py-12 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
        <p className="text-lg text-[#5F6A66]">
          No hay categorías registradas.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded-[28px] bg-white/80 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h4 className="text-lg font-medium leading-snug text-[#2F3433] sm:text-xl">
                  {category.name}
                </h4>

                <p className="mt-2 text-sm uppercase tracking-[0.14em] text-[#7E8C87]">
                  {category.productsCategory?.length ?? 0} producto
                  {(category.productsCategory?.length ?? 0) === 1 ? "" : "s"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(category.id)}
                  className="rounded-full bg-[#F1F3F2] p-2 text-[#2F3433] transition hover:bg-[#E4E8E6]"
                  aria-label="Editar categoría"
                >
                  <Pencil className="h-4 w-4" />
                </button>

                <button
                  onClick={() => handleOpenModalDelete(category.id)}
                  className="rounded-full bg-[#F8EEEE] p-2 text-[#8B4A4A] transition hover:bg-[#F1DEDE]"
                  aria-label="Eliminar categoría"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isOpenModalDelete && (
        <ConfirmationModal
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          textButtonConfirm="Eliminar"
          textButtonCancel="Cancelar"
        >
          <div className="text-center">
            <p className="text-base font-medium text-[#2F3433]">
              ¿Eliminar esta categoría?
            </p>
            <p className="mt-2 text-sm text-[#6B7773]">
              Esta acción es irreversible.
            </p>
          </div>
        </ConfirmationModal>
      )}
    </>
  );
}