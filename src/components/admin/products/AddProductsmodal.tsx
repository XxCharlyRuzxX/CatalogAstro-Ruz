import { uploadImageToCloudinary } from "@/lib/service/cloudinaryService";
import type { ProductDTO } from "@/lib/interfaces";
import useDropzoneUpload from "@/components/hooks/Dropzone";
import useField from "@/components/hooks/useField";

interface AddProductsModalProps {
  readonly isOpen: boolean;
  readonly CloseModal: () => void;
  readonly onSubmit: (product: ProductDTO) => Promise<void>;
}

export default function AddProductsModal({
  isOpen,
  CloseModal,
  onSubmit,
}: AddProductsModalProps) {
  const nameProduct = useField("", {
    type: "text",
    placeholder: "Nombre del producto",
    required: true,
    className:
      "border p-2 rounded w-full placeholder:text-[12px] md:placeholder:text-[16px]",
  });

  const brand = useField("", {
    type: "text",
    placeholder: "Marca",
    required: true,
    className:
      "border p-2 rounded w-full placeholder:text-[12px] md:placeholder:text-[16px]",
  });

  const priceProduct = useField("", {
    type: "number",
    placeholder: "Precio",
    required: true,
    className:
      "border p-2 rounded w-full placeholder:text-[12px] md:placeholder:text-[16px]",
  });

  const { file, getRootProps, getInputProps, isDragActive, clearFile } =
    useDropzoneUpload();

  const description = useField("", {
    placeholder: "Descripción",
    required: true,
    className:
      "border p-2 rounded resize-none overflow-y-auto h-12 md:h-24 w-full placeholder:text-[12px] md:placeholder:text-[16px]",
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = "";
    if (file) {
      imageUrl = await uploadImageToCloudinary(file);
    }
    onSubmit({
      nameProduct: nameProduct.value,
      brand: brand.value,
      priceProduct: parseFloat(priceProduct.value),
      imgProduct: imageUrl,
      description: description.value,
      categoriesProduct: [],
    });

    nameProduct.reset();
    brand.reset();
    priceProduct.reset();
    description.reset();
    clearFile();
    CloseModal();
  };

  const getDropzoneMensage = (file: File | null, isDragActive: boolean) => {
    if (file) {
      return (
        <p className="text-(--primary-green) text-[12px] md:text-[16px]">
          Imagen cargada corrctamente:
          {file.name}
        </p>
      );
    }
    if (isDragActive) {
      return <p className="text-[12px] md:text-[16px] text-gray-500">Suelta la imagen aquí...</p>;
    }
    return (
      <p className="text-gray-500 text-[12px] md:text-[16px]">
        Arrastra y suelta una imagen, o haz clic para seleccionar
      </p>
    );
  };

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
            <h2 className="text-[16px] md:text-xl font-semibold text-center">
              Añadir nuevo producto
            </h2>
            <img src="/icons/beauty.svg" alt="Producto" className="w-10 h-10" />
          </div>

          <form onSubmit={handleFormSubmit} className="flex flex-col">
            <label
              htmlFor="productName"
              className="my-2 text-[12px] md:text-[16px]"
            >
              Nombre del producto:
            </label>
            <input id="productName" name="productName" type={nameProduct.type} {...nameProduct.bind} />

            <label
              htmlFor="productBrand"
              className="my-2 text-[12px] md:text-[16px]"
            >
              Marca:
            </label>
            <input id="productBrand" name="productBrand" type={brand.type} {...brand.bind} />

            <label
              htmlFor="productPrice"
              className="my-2 text-[12px] md:text-[16px]"
            >
              Precio del producto:
            </label>
            <input
            id="productPrice"
            name="productPrice"
              type={priceProduct.type}
              min="0"
              step="0.01"
              {...priceProduct.bind}
            />
            <label
              htmlFor="productImage"
              className="my-2 text-[12px] md:text-[16px]"
            >
              Imagen del producto:
            </label>
            <div
              {...getRootProps()}
              className={`w-full p-2 text-center rounded-lg border-2 transition-all duration-300 ease-in-out ${
                isDragActive
                  ? "border-blue-400 bg-blue-50"
                  : "border-dashed border-gray-300 bg-gray-50 hover:border-gray-400"
              }`}
            >
              <input {...getInputProps()} id="productImage" name="productImage" required />

              <div className="flex flex-col items-center justify-center gap-1">
                <img
                  src="/icons/upload.svg"
                  alt="Subir imagen"
                  className="w-8 h-8 md:w-12 md:h-12 opacity-70"
                />
                {getDropzoneMensage(file, isDragActive)}
              </div>
            </div>

            <label
              htmlFor="productDescription"
              className="my-2 text-[12px] md:text-[16px]"
            >
              Descripción del producto:
            </label>
            <textarea id="productDescription" name="productDescription" {...description.bind} onChange={description.onChange} />

            <button
              type="submit"
              className="bg-(--primary-green) hover:bg-lime-800  text-white py-2 rounded mt-3 text-[12px] md:text-[16px] transition-colors duration-300 "
            >
              Añadir Producto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
