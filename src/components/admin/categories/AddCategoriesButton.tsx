import { useState } from "react";
import type { CategoryDTO } from "@/lib/interfaces";
import AddCategoryModal from "./AddCategoryModal";

interface AddCategoriesButtonProps {
  readonly onSubmit: (category: CategoryDTO) => Promise<void>;
}

export default function AddCategoriesButton({ onSubmit }: AddCategoriesButtonProps) {
  const  [openModal, setOpenModal] = useState(false);


  const handleButtonClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  return (
    <>
    <div className="fixed bottom-10 left-10 z-50">
    <button
      className="group flex items-center rounded-xl bg-blue-500 overflow-hidden transition-all duration-300 ease-in-out w-10 h-10 sm:w-12 sm:h-12 hover:w-42 sm:hover:w-48 px-2 sm:px-3 shadow-lg"
      onClick={handleButtonClick}
      >
      <img
        src="/icons/add.svg"
        alt="Actualizar"
        className="w-6 h-6 transition-all duration-300 ease-in-out"
        />
      <span
        className="ml-2 text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
        >
        <p className="text-[0.75rem] md:text-[0.875rem] text-center">Añadir Categorias</p>
      </span>
    </button>
  </div>
  <AddCategoryModal isOpen={openModal} CloseModal={handleCloseModal} onSubmit={onSubmit}/>
  </>
  )
}