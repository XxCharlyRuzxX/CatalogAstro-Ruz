import { useEffect } from "react";
import { uploadImageToCloudinary } from "@/lib/service/cloudinaryService";
import type { Product, ProductDTO } from "@/lib/interfaces";
import useDropzoneUpload from "@/components/hooks/Dropzone";
import useField from "@/components/hooks/useField";
import { ImagePlus, Package, X } from "lucide-react";

interface ProductFormModalProps {
  readonly isOpen: boolean;
  readonly CloseModal: () => void;
  readonly onSubmit: (product: ProductDTO) => Promise<void>;
  readonly title: string;
  readonly submitLabel: string;
  readonly initialProduct?: Product;
}

export default function ProductFormModal({
  isOpen,
  CloseModal,
  onSubmit,
  title,
  submitLabel,
  initialProduct,
}: ProductFormModalProps) {
  const nameProduct = useField("", {
    type: "text",
    placeholder: "Nombre del producto",
    required: true,
    className:
      "h-12 w-full rounded-2xl border border-[#D9E1DE] bg-[#FAFBFA] px-4 text-sm text-[#2F3433] outline-none transition placeholder:text-[#A0AAA6] focus:border-[#AFC4BD] focus:ring-2 focus:ring-[#DCE7E2]",
  });

  const brand = useField("", {
    type: "text",
    placeholder: "Marca",
    required: true,
    className:
      "h-12 w-full rounded-2xl border border-[#D9E1DE] bg-[#FAFBFA] px-4 text-sm text-[#2F3433] outline-none transition placeholder:text-[#A0AAA6] focus:border-[#AFC4BD] focus:ring-2 focus:ring-[#DCE7E2]",
  });

  const priceProduct = useField("", {
    type: "number",
    placeholder: "Precio",
    required: true,
    className:
      "h-12 w-full rounded-2xl border border-[#D9E1DE] bg-[#FAFBFA] px-4 text-sm text-[#2F3433] outline-none transition placeholder:text-[#A0AAA6] focus:border-[#AFC4BD] focus:ring-2 focus:ring-[#DCE7E2]",
  });

  const description = useField("", {
    placeholder: "Descripción",
    required: true,
    className:
      "min-h-28 w-full resize-none rounded-2xl border border-[#D9E1DE] bg-[#FAFBFA] px-4 py-3 text-sm text-[#2F3433] outline-none transition placeholder:text-[#A0AAA6] focus:border-[#AFC4BD] focus:ring-2 focus:ring-[#DCE7E2]",
  });

  const { file, getRootProps, getInputProps, isDragActive, clearFile } =
    useDropzoneUpload();

  useEffect(() => {
    if (initialProduct) {
      nameProduct.setValue(initialProduct.nameProduct);
      brand.setValue(initialProduct.brand);
      priceProduct.setValue(initialProduct.priceProduct.toString());
      description.setValue(initialProduct.description);
    } else {
      nameProduct.reset();
      brand.reset();
      priceProduct.reset();
      description.reset();
      clearFile();
    }
  }, [initialProduct, isOpen]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = initialProduct?.imgProduct ?? "";

    if (file) {
      imageUrl = await uploadImageToCloudinary(file);
    }

    await onSubmit({
      nameProduct: nameProduct.value,
      brand: brand.value,
      priceProduct: Number.parseFloat(priceProduct.value),
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

  const getDropzoneMessage = () => {
    if (file) {
      return (
        <>
          <p className="text-sm font-medium text-[#0F6C74]">
            Imagen cargada correctamente
          </p>
          <p className="text-xs text-[#6B7773]">{file.name}</p>
        </>
      );
    }

    if (isDragActive) {
      return <p className="text-sm text-[#6B7773]">Suelta la imagen aquí...</p>;
    }

    if (initialProduct?.imgProduct) {
      return (
        <>
          <p className="text-sm font-medium text-[#0F6C74]">
            Imagen actual registrada
          </p>
          <p className="text-xs text-[#6B7773]">
            Arrastra una imagen o haz clic para reemplazarla
          </p>
        </>
      );
    }

    return (
      <>
        <p className="text-sm font-medium text-[#2F3433]">
          Arrastra una imagen o haz clic
        </p>
        <p className="text-xs text-[#6B7773]">
          Selecciona la imagen del producto
        </p>
      </>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-white px-5 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:px-6">
        <button
          onClick={CloseModal}
          className="sticky top-0 ml-auto flex rounded-full bg-white p-2 text-[#7E8C87] transition hover:bg-[#F1F3F2] hover:text-[#2F3433]"
          aria-label="Cerrar modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F3EF]">
            <Package className="h-6 w-6 text-[#0F6C74]" />
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-[#7E8C87]">
            Administración
          </p>

          <h3 className="mt-2 text-xl font-medium text-[#2F3433] sm:text-2xl">
            {title}
          </h3>
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label htmlFor="productName" className="text-sm font-medium text-[#2F3433]">
                Nombre del producto
              </label>
              <input id="productName" type={nameProduct.type} {...nameProduct.bind} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="productBrand" className="text-sm font-medium text-[#2F3433]">
                Marca
              </label>
              <input id="productBrand" type={brand.type} {...brand.bind} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="productPrice" className="text-sm font-medium text-[#2F3433]">
                Precio
              </label>
              <input
                id="productPrice"
                min="0"
                step="0.01"
                type={priceProduct.type}
                {...priceProduct.bind}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="productImage" className="text-sm font-medium text-[#2F3433]">
              Imagen del producto
            </label>
            <div
              {...getRootProps()}
              className={`rounded-3xl border-2 px-5 py-6 text-center transition-all duration-300 ${
                isDragActive
                  ? "border-[#AFC4BD] bg-[#EEF4F1]"
                  : "border-dashed border-[#D9E1DE] bg-[#FAFBFA] hover:border-[#BFCFC9]"
              }`}
            >
              <input id="productImage" {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1F3F2]">
                  <ImagePlus className="h-6 w-6 text-[#0F6C74]" />
                </div>
                {getDropzoneMessage()}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="productDescription" className="text-sm font-medium text-[#2F3433]">
              Descripción
            </label>
            <textarea id="productDescription" {...description.bind} onChange={description.onChange} />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-2xl bg-[#2C3E3A] px-5 py-3 text-sm uppercase tracking-[0.12em] text-white transition-all duration-300 hover:scale-[1.01] hover:bg-[#243531]"
          >
            {submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
