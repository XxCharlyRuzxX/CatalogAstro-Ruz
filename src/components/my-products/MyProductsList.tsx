import { useState } from "react";
import type { Product } from "@/lib/interfaces";
import { getSelectedProducts, removeProduct } from "@/utils/selectedProducts";
import ConfirmationModal from "../react-components/ConfirmationModal";

const ITEMS_PER_PAGE = 5;

interface MyProductsListProps {
  readonly products: Product[];
  readonly setProducts: (products: Product[]) => void;
}

export default function MyProductsList({
  products,
  setProducts,
}: MyProductsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [productToRemoveId, setProductToRemoveId] = useState<string | null>(
    null
  );

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totalPrice = products.reduce(
    (total, product) => total + product.priceProduct,
    0
  );

  const handleRemoveButton = (id: string) => {
    setProductToRemoveId(id);
    setIsOpenModal(true);
  };

  const handleModalAccept = () => {
    if (!productToRemoveId) return;

    removeProduct(productToRemoveId);
    const updated = getSelectedProducts();
    setProducts(updated);

    if (
      (currentPage - 1) * ITEMS_PER_PAGE >= updated.length &&
      currentPage > 1
    ) {
      setCurrentPage(currentPage - 1);
    }

    setIsOpenModal(false);
    setProductToRemoveId(null);
  };

  return (
    <div>
      {products.length > 0 ? (
        <ul className="flex flex-col space-y-2 border border-b-0">
          {currentProducts.map((product) => (
            <li
              key={product.idProduct}
              className="flex p-2 border-b gap-x-4 items-start"
            >
              <img
                src={product.imgProduct}
                alt={product.nameProduct}
                className="w-20 h-auto object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{product.nameProduct}</h3>
                <p className="text-sm text-gray-700">{product.description}</p>
              </div>
              <p className="font-bold whitespace-nowrap">
                ${product.priceProduct.toFixed(2)}
              </p>
              <button onClick={() => handleRemoveButton(product.idProduct)}>
                <img
                  src="/icons/trash.svg"
                  alt="Eliminar"
                  className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity duration-200"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No tienes productos en el carrito.</p>
      )}
      {products.length > 0 && (
        <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
          {totalPages > 1 && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                ←
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === index + 1
                      ? "bg-gray-300"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                →
              </button>
            </div>
          )}
          <div className="flex justify-end">
            <div className="flex gap-5 font-semibold text-xl justify-end">
              <p>
                Total de productos:{" "}
                <span className="font-normal">{products.length}</span>
              </p>
              <p>
                Total a pagar:{" "}
                <span className="text-(--primary-green)">
                  ${totalPrice.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
      {isOpenModal && productToRemoveId && (
        <ConfirmationModal
          textButtonConfirm="Eliminar"
          textButtonCancel="Cancelar"
          onConfirm={handleModalAccept}
          onCancel={() => {
            setIsOpenModal(false);
            setProductToRemoveId(null);
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <p className="text-x2s text-center">
              ¿Estás seguro de que deseas eliminar este producto del carrito?
            </p>
            <img
              src="/icons/trash.svg"
              alt="Eliminar"
              className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity duration-200"
            />
          </div>
        </ConfirmationModal>
      )}
    </div>
  );
}
