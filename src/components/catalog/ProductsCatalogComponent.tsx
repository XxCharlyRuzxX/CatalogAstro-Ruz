import { useState } from "react";
import type { Product } from "@/lib/interfaces";
import ProductCardReact from "./ProductCardReact";

interface ProductsCatalogComponentProps {
  readonly products: Product[];
}

const PRODUCTS_PER_PAGE = 9;

export default function ProductsCatalogComponent({
  products,
}: ProductsCatalogComponentProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, endIndex);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="lg:col-span-2 w-full">
      <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-3 md:gap-6 justify-items-center max-w-full">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <div className="max-w-[250px]" key={product.idProduct}>
              <ProductCardReact key={product.idProduct} product={product} />
              </div>
            ))
          ) : (
            <p className="text-[0.625rem] sm:text-[0.75rem] md:text-[0.875rem]">
              Ningún producto coincide con la búsqueda.
            </p>
          )}
        </div>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center xl:ml-10 items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            <p className="p-base">
              Anterior
            </p>
          </button>
          <span className="text-gray-700">
          <p className="p-base">
              Página {currentPage} de {totalPages}
            </p>
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            <p className="p-base">
              Siguiente
            </p>
          </button>
        </div>
      )}
    </div>
  );
}
