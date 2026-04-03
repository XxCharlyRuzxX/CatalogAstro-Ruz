import useField from "@/components/hooks/useField";
import type { CategoryDTO } from "@/lib/interfaces";
import { FolderPlus, Tags, X } from "lucide-react";

interface CategoryFormModalProps {
  readonly isOpen: boolean;
  readonly CloseModal: () => void;
  readonly onSubmit: (category: CategoryDTO) => Promise<void>;
}

export default function CategoryFormModal({
  isOpen,
  CloseModal,
  onSubmit,
}: CategoryFormModalProps) {
  const categoryName = useField("", {
    type: "text",
    placeholder: "Nombre de la categoría",
    required: true,
    className:
      "h-12 w-full rounded-2xl border border-[#D9E1DE] bg-[#FAFBFA] px-4 text-sm text-[#2F3433] outline-none transition placeholder:text-[#A0AAA6] focus:border-[#AFC4BD] focus:ring-2 focus:ring-[#DCE7E2]",
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit({
      name: categoryName.value,
    });

    categoryName.reset();
    CloseModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-[28px] bg-white px-5 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:px-6">
        <button
          onClick={CloseModal}
          className="sticky top-0 ml-auto flex rounded-full bg-white p-2 text-[#7E8C87] transition hover:bg-[#F1F3F2] hover:text-[#2F3433]"
          aria-label="Cerrar modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F3EF]">
            <Tags className="h-6 w-6 text-[#0F6C74]" />
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-[#7E8C87]">
            Administración
          </p>

          <h3 className="mt-2 text-xl font-medium text-[#2F3433] sm:text-2xl">
            Añadir nueva categoría
          </h3>
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="categoryName"
              className="text-sm font-medium text-[#2F3433]"
            >
              Nombre de la categoría
            </label>

            <input
              id="categoryName"
              name="categoryName"
              type={categoryName.type}
              {...categoryName.bind}
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2C3E3A] px-5 py-3 text-sm uppercase tracking-[0.12em] text-white transition-all duration-300 hover:scale-[1.01] hover:bg-[#243531]"
          >
            <FolderPlus className="h-4 w-4" />
            Crear categoría
          </button>
        </form>
      </div>
    </div>
  );
}