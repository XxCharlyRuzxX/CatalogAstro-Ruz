import { useState } from "react";
import OrderProductsModal from "./OrderProdutsModal";
import { MessageCircleMore } from "lucide-react";
import { GlobalToast } from "../GlobalToast";

interface OrderComponentProps {
  readonly productsNumber: number;
}

export default function OrderComponent({
  productsNumber,
}: OrderComponentProps) {
  const [openModal, setOpenModal] = useState(false);

  const handleButtonClick = () => {
    if (productsNumber < 1) {
      GlobalToast.error("No tienes productos en el carrito");
      return;
    }
    setOpenModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <button
        onClick={handleButtonClick}
        className="w-full rounded-2xl bg-[#2C3E3A] px-6 py-4 text-white flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300
        hover:scale-[1.02] hover:bg-[#075E54]"
      >
        <MessageCircleMore className="w-5 h-5" />

        <span className="text-sm sm:text-base tracking-[0.12em] uppercase">
          Pedir por WhatsApp
        </span>
      </button>

      <OrderProductsModal
        isOpen={openModal}
        CloseModal={() => setOpenModal(false)}
      />
    </div>
  );
}
