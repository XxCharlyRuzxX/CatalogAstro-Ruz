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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-100">
      <div className="bg-white p-6 rounded-lg w-2xl relative shadow-lg mb-2">
        {children}
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {textButtonConfirm}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-gray-400"
          >
            {textButtonCancel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
