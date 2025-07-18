import { useState } from "react";
import ConfirmationModal from "../react-components/ConfirmationModal";

export default function LogoutButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnclickButton = () => {
    setIsModalOpen(true);
  };

  const handleOnCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOnConfirmModal = async () => {
    setIsModalOpen(false);

    try {
      await fetch("/api/admin/logout", {
        method: "GET",
      });
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      <button
        onClick={handleOnclickButton}
        className="text-white bg-red-500 rounded-2xl hover:bg-red-600 px-4 py-2 font-semibold transition-colors duration-300"
      >
        <p className="p-base"> Cerrar Sesión</p>
      </button>
      {isModalOpen && (
        <ConfirmationModal
          onCancel={handleOnCloseModal}
          onConfirm={handleOnConfirmModal}
        >
          <div className="flex flex-col items-center justify-center px-6 py-2">
            <h3 className="font-semibold mb-4 ">
              ¿Estás seguro de cerrar la sesión?
            </h3>
            <p className="text-gray-600 mb-4 p-base">
              Esta acción cerrará tu sesión actual.
            </p>
          </div>
        </ConfirmationModal>
      )}
    </>
  );
}
