import { useEffect, useState } from "react";
import type { Product } from "@/lib/interfaces";
import { Pencil, Trash2 } from "lucide-react";

interface ProductsAdminListProps {
  readonly products: Product[];
  readonly onEdit: (productId: string) => void;
  readonly onDelete: (productId: string) => void;
}

const PRODUCTS_PER_PAGE = 6;

export default function ProductsAdminList({
  products,
  onEdit,
  onDelete,
}: ProductsAdminListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, endIndex);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (products.length === 0) {
    return (
      <div className="rounded-[28px] bg-white/80 px-6 py-12 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
        <p className="text-lg text-[#5F6A66]">
          No hay productos registrados.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-5">
        {paginatedProducts.map((product) => (
          <div
            key={product.idProduct}
            className="rounded-[28px] bg-white/80 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-5"
          >
            <div className="flex items-start gap-4">
              <img
                src={product.imgProduct}
                alt={product.nameProduct}
                className="h-24 w-24 rounded-2xl object-cover sm:h-28 sm:w-28"
                loading="lazy"
                />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="text-lg font-medium leading-snug text-[#2F3433] sm:text-xl">
                      {product.nameProduct}
                    </h4>

                    {product.brand && (
                      <p className="mt-1 text-sm uppercase tracking-[0.14em] text-[#7E8C87]">
                        {product.brand}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(product.idProduct)}
                      className="rounded-full bg-[#F1F3F2] p-2 text-[#2F3433] transition hover:bg-[#E4E8E6]"
                      aria-label="Editar producto"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => onDelete(product.idProduct)}
                      className="rounded-full bg-[#F8EEEE] p-2 text-[#8B4A4A] transition hover:bg-[#F1DEDE]"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {product.description && (
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#6B7773] sm:text-base">
                    {product.description}
                  </p>
                )}

                <div className="mt-4">
                  <p className="text-lg font-medium text-[#0F6C74] sm:text-xl">
                    ${product.priceProduct.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="rounded-full bg-[#2C3E3A] px-5 py-2 text-sm text-[#F4F1EC] transition hover:bg-[#243531] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="text-sm text-[#2F3433]">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="rounded-full bg-[#2C3E3A] px-5 py-2 text-sm text-[#F4F1EC] transition hover:bg-[#243531] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}