import { useEffect, useState } from "react";
import type { Product } from "@/lib/interfaces";
import ProductCardReact from "./ProductCardReact";

interface ProductsCatalogComponentProps {
  readonly products: Product[];
}

const PRODUCTS_PER_PAGE = 8;

export default function ProductsCatalogComponent({
  products,
}: ProductsCatalogComponentProps) {
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

  return (
    <div className="w-full">
      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
          {paginatedProducts.map((product) => (
            <div key={product.idProduct}>
              <ProductCardReact product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-sm text-[#6B6A66]">
            Ningún producto coincide con la búsqueda.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="rounded-full bg-[#0F6C74] px-5 py-2 text-sm text-[#F4F1EC] transition hover:bg-[#1694a0] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="text-sm text-black">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="rounded-full bg-[#0F6C74] px-5 py-2 text-sm text-[#F4F1EC] transition hover:bg-[#1694a0] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
