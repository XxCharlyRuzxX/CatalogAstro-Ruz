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
    <div className="md:col-span-2">
      <h3 className="text-xl mb-4">Catálogo de Productos</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCardReact key={product.idProduct} product={product} />
          ))
        ) : (
          <p>Ningún producto coincide con la búsqueda.</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-items-start items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
