import { useState } from "react";
import AddProductsModal from "./AddProductsmodal";
import type { ProductDTO } from "@/lib/interfaces";

interface AddProductsButtonProps {
  readonly onSubmit: (product: ProductDTO) => Promise<void>;
}

export default function AddProductsButton({ onSubmit }: AddProductsButtonProps) {
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
        <p className="p-base text-center">Añadir producto</p>
      </span>
    </button>
  </div>
  <AddProductsModal isOpen={openModal} CloseModal={handleCloseModal} onSubmit={onSubmit}/>
  </>
  )
}