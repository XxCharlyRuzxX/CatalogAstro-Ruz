import React from "react";
import { createPortal } from "react-dom";

interface ConfirmationModalProps {
  readonly children: React.ReactNode;
  readonly textButtonConfirm?: string;
  readonly textButtonCancel?: string;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
}

export default function ConfirmationModal({
  children,
  textButtonConfirm = "Confirmar",
  textButtonCancel = "Cancelar",
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-3xl bg-white px-6 py-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
        <div className="text-center text-[#2F3433] text-base leading-relaxed">
          {children}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={onConfirm}
            className="w-full rounded-2xl bg-[#2C3E3A] px-5 py-3 text-white text-sm uppercase tracking-[0.12em]
                       transition-all duration-300 hover:bg-[#243531] hover:scale-[1.02]"
          >
            {textButtonConfirm}
          </button>
          <button
            onClick={onCancel}
            className="w-full rounded-2xl bg-[#F1F3F2] px-5 py-3 text-[#2F3433] text-sm uppercase tracking-[0.12em]
                       transition-all duration-300 hover:bg-[#E4E8E6]"
          >
            {textButtonCancel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
