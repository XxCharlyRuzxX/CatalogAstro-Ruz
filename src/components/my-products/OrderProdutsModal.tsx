import { useState } from "react";
import { orderViaWhatsApp } from "@/utils/selectedProducts";
import ConfirmationModal from "../react-components/ConfirmationModal";
import { MessageCircle, X } from "lucide-react";

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
    const words = value.trim().split(/\s+/).filter(Boolean);
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

  const wordsCount = form.comment.trim().split(/\s+/).filter(Boolean).length;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
        <div className="relative w-full max-w-lg rounded-[28px] bg-white px-6 py-7 shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:px-8">
          <button
            onClick={CloseModal}
            className="absolute right-4 top-4 rounded-full p-2 text-[#7E8C87] transition hover:bg-[#F1F3F2] hover:text-[#2F3433]"
            aria-label="Cerrar modal"
          >
            <X className="h-5 w-5" />
          </button>

          {orderSent ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F3EF]">
                <MessageCircle className="h-7 w-7 text-[#0F6C74]" />
              </div>

              <h2 className="text-2xl font-medium text-[#2F3433]">
                ¡Pedido enviado!
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#6B7773] sm:text-base">
                Estás siendo redirigido a WhatsApp para completar tu pedido.
              </p>
            </div>
          ) : (
            <div className="text-[#2F3433]">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F3EF]">
                  <MessageCircle className="h-7 w-7 text-[#0F6C74]" />
                </div>

                <p className="text-xs uppercase tracking-[0.2em] text-[#7E8C87]">
                  Pedido
                </p>

                <h2 className="mt-2 text-2xl font-medium leading-tight sm:text-3xl">
                  Completa tu pedido por WhatsApp
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#6B7773] sm:text-base">
                  Ingresa tus datos para generar el mensaje de pedido y
                  continuar con la compra.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-medium text-[#2F3433]"
                  >
                    Nombre completo
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="h-12 rounded-2xl border border-[#D9E1DE] bg-[#FAFBFA] px-4 text-sm text-[#2F3433] outline-none transition placeholder:text-[#A0AAA6] focus:border-[#AFC4BD] focus:ring-2 focus:ring-[#DCE7E2]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="comment"
                    className="text-sm font-medium text-[#2F3433]"
                  >
                    Comentario de entrega
                  </label>

                  <textarea
                    id="comment"
                    placeholder="Escribe una referencia o comentario breve"
                    value={form.comment}
                    onChange={handleCommentChange}
                    className="min-h-28 resize-none rounded-2xl border border-[#D9E1DE] bg-[#FAFBFA] px-4 py-3 text-sm text-[#2F3433] outline-none transition placeholder:text-[#A0AAA6] focus:border-[#AFC4BD] focus:ring-2 focus:ring-[#DCE7E2]"
                  />

                  <p className="text-right text-xs text-[#7E8C87]">
                    {wordsCount}/{MAX_WORDS} palabras
                  </p>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-2xl bg-[#2C3E3A] px-5 py-3 text-sm uppercase tracking-[0.12em] text-white transition-all duration-300 hover:scale-[1.01] hover:bg-[#243531]"
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
          <div className="space-y-3 text-center text-sm leading-6 text-[#5F6A66]">
            <p>
              A continuación serás redirigido a WhatsApp para completar tu
              pedido.
            </p>
            <p>
              Se generará automáticamente el mensaje con tus productos y se
              vaciará tu carrito.
            </p>
            <p className="pt-1 font-medium text-[#2F3433]">
              ¿Deseas continuar?
            </p>
          </div>
        </ConfirmationModal>
      )}
    </>
  );
}
