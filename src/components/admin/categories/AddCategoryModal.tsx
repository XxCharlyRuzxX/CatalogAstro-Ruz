import useField from "@/components/hooks/useField";
import type { CategoryDTO } from "@/lib/interfaces";

interface AddProductsModalProps {
  readonly isOpen: boolean;
  readonly CloseModal: () => void;
  readonly onSubmit: (product: CategoryDTO) => Promise<void>;
}

export default function AddCategoryModal({
  isOpen,
  CloseModal,
  onSubmit,
}: AddProductsModalProps) {
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: categoryName.value,
    });
    categoryName.reset();
    CloseModal();
  };

  const categoryName = useField("", {
    type: "text",
    placeholder: "Nombre del producto",
    required: true,
    className:
      "border p-2 rounded w-full placeholder:text-[12px] md:placeholder:text-[16px]",
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full  max-w-xs md:max-w-xl relative shadow-lg">
        <button
          onClick={CloseModal}
          className="absolute top-3 right-3 hover:scale-110 transition-transform duration-300"
        >
          <img src="/icons/close.svg" alt="Cerrar" className="w-4 h-4" />
        </button>

        <div className="p-4 text-black">
          <div className="flex justify-center gap-2 mb-2 md:mb-4 items-center">
            <h3 className="font-semibold text-center">
              Añadir nueva categoría
            </h3>
            <img
              src="/icons/category.svg"
              alt="Producto"
              className="w-10 h-10"
            />
          </div>

          <form onSubmit={handleFormSubmit} className="flex flex-col">
            <label htmlFor="productName" className="my-2 p-base">
              Nombre de la categoria:
            </label>
            <input
              id="categoryName"
              name="categoryName"
              type={categoryName.type}
              {...categoryName.bind}
            />

            <button
              type="submit"
              className="bg-(--primary-green) hover:bg-lime-800  text-white py-2 rounded mt-3 transition-colors duration-300 "
            >
              <p className="p-base"> Añadir Categoría</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
