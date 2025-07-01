import { useState } from "react";
import { orderViaWhatsApp } from "@/utils/selectedProducts";
import ConfirmationModal from "../react-components/ConfirmationModal";

interface OrderProductsModalProps {
  readonly isOpen: boolean;
  readonly CloseModal: () => void;
}

export default function OrderProductsModal({
  isOpen,
  CloseModal,
}: OrderProductsModalProps) {
  const [form, setForm] = useState({ name: "", comment: "" });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  const MAX_WORDS = 50;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const words = value.trim().split(/\s+/);
    if (words.length <= MAX_WORDS) {
      setForm({ ...form, comment: value });
    }
  };

  const handleConfirmOrder = () => {
    orderViaWhatsApp(form.name, form.comment);
    setOrderSent(true);
    setShowConfirmModal(false);

    setTimeout(() => {
      setForm({ name: "", comment: "" });
      setOrderSent(false);
      CloseModal();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal principal del formulario */}
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-lg">
          <button
            onClick={CloseModal}
            className="absolute top-3 right-3 hover:scale-110 transition-transform duration-300"
          >
            <img src="/icons/close.svg" alt="Cerrar" className="w-4 h-4" />
          </button>

          {orderSent ? (
            <div className="text-center text-green-700">
              <h2 className="text-xl font-semibold mb-2">✅ ¡Pedido enviado!</h2>
              <p>Estás siendo redirigido a WhatsApp...</p>
            </div>
          ) : (
              <div className="p-4 text-black">
                <div className="flex justify-center gap-2">
                  <h2 className="text-xl font-semibold mb-8 text-center">
                    Completa el Formulario Para Realizar tu Pedido Via WhatsApp
                  </h2>
                  <img
                    src="/icons/whatsapp-logo.svg"
                    alt="WhatsApp"
                    className="w-12 h-12"
                  />
                </div>
                <form
                  onSubmit={handleFormSubmit}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="fullName" className="text-left">
                      Ingresa tu nombre completo:
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre completo"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                      className="border p-2 rounded"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="comment" className="text-left">
                      Comentario de la Entrega (opcional):
                    </label>
                    <textarea
                      placeholder="Comentario (máximo 50 palabras)"
                      value={form.comment}
                      onChange={handleCommentChange}
                      className="border p-2 rounded resize-none overflow-y-auto h-24"
                    />
                    <p className="text-sm text-gray-500 text-right">
                      {form.comment.trim().split(/\s+/).filter(Boolean).length}/
                      {MAX_WORDS} palabras
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="bg-(--primary-green) text-white py-2 rounded hover:bg-lime-800"
                  >
                    Confirmar pedido
                  </button>
                </form>
              </div>
          )}
        </div>
      </div>
      {showConfirmModal && (
        <ConfirmationModal
          onConfirm={handleConfirmOrder}
          onCancel={() => setShowConfirmModal(false)}
          textButtonConfirm="Continuar"
          textButtonCancel="Cancelar"
        >
          <div className="text-center text-2xs text-gray-800 space-y-2">
    <p>
      A continuación serás redirigido a WhatsApp para completar tu pedido.
    </p>
    <p>
      Al redirigirte automáticamente se generará tu pedido en texto y se vaciará tu Carrito de Productos.
    </p>
    <p className="mt-4 font-semibold">¿Deseas continuar?</p>
  </div>
        </ConfirmationModal>
      )}
    </>
  );
}
