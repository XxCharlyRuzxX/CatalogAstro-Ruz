import type { Category } from "@/lib/interfaces";
import { ActionsCell } from "../ActionsCell";
import { useState } from "react";
import ConfirmationModal from "@/components/react-components/ConfirmationModal";

interface CategoriesAdminTableProps {
  readonly categories?: Category[];
  readonly onEdit: (categoryId: string) => void;
  readonly onDelete: (categoryId: string) => void;
}

export default function CategoriesAdminTable({
  onEdit,
  onDelete,
  categories,
}: CategoriesAdminTableProps) {
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

  return (
    <div className="w-full p-4 shadow-md rounded-lg bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full border-gray-100 text-[.75rem] md:text-[.95rem]">
          <thead className="bg-[#333333]">
            <tr className="text-white">
              <th className="text-center px-4 py-2">Nombre de la Categoria</th>
              <th className="text-center px-4 py-2">N° de productos</th>
              <th className="text-center px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr key={category.id} className="border-t">
                <td className="px-4 py-2 ">{category.name}</td>
                <td className="px-4 py-2 text-center">{category.productsCategory?.length ?? "0"}</td>
                <td className="flex px-4 py-2 space-x-2">
                  <ActionsCell
                    onDelete={() => handleOpenModalDelete(category.id)}
                    onEdit={() => onEdit(category.id)}
                    objectId={category.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpenModalDelete && (
        <ConfirmationModal onCancel={handleCancelDelete} onConfirm={handleConfirmDelete}>
          <p className="text-center text-gray-700 flex flex-col items-center font-semibold">
            ¿Estás seguro de que quieres eliminar esta categoría?
            <br />
            Esta acción es irreversible.
          </p>
        </ConfirmationModal>
      )}
    </div>
  );
}
