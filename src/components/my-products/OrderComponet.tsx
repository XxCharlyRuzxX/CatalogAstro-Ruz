import { useState } from "react";
import OrderProductsModal from "./OrderProdutsModal";
import { toast } from "react-toastify";

interface OrderComponentProps {
  readonly productsNumber: number;
}
export default function OrderComponent({productsNumber} : OrderComponentProps) {
  const  [openModal, setOpenModal] = useState(false);

  const handleButtonClick = () => {
    if (productsNumber < 1) {
      toast.error("No tienes productos en el Carrito");
      return;
    }
    setOpenModal(true);
  }
  return(
    <div className="flex flex-col items-center justify-center gap-4 w-full ">
    <button
          onClick={() => {handleButtonClick()}}
          className="text-white bg-(--primary-green) px-6 py-3 rounded hover:bg-lime-800 transition-colors duration-300 min-w-2xs flex gap-2 justify-center cursor-pointer w-full lg:w-auto"
          >
          <p>Pedir en Tienda</p>
          <img
            src="/icons/whatsapp-logo.svg"
            alt="Carrito"
            className="w-5 h-5"
            />
    </button>
    <OrderProductsModal
    isOpen={openModal}
    CloseModal={() => setOpenModal(false)}
    />
  </div>
  )
}