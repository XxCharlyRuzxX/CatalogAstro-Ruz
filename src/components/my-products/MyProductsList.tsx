import { useState } from "react";
import type { Product } from "@/lib/interfaces";
import { getSelectedProducts, removeProduct } from "@/utils/selectedProducts";
import ConfirmationModal from "../react-components/ConfirmationModal";
import OrderComponent from "./OrderComponet";

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
      <div className="flex">
            <div className="flex gap-2 lg:gap-5 font-semibold justify-end mb-2">
              <div>
              <p className="p-large">
                Total de productos:{" "}
                <span className="p-large font-normal">
                  {products.length}
                </span>
              </p>
              </div>
              <div>
              <p className="p-large">
                Total a pagar:{" "}
                <span className="text-(--primary-green) p-large">
                  ${totalPrice.toFixed(2)}
                </span>
              </p>
                </div>
            </div>
          </div>
      {products.length > 0 ? (
        <><ul className="flex flex-col space-y-2 border border-b-0">
          {currentProducts.map((product) => (
            <li
              key={product.idProduct}
              className="flex p-2 border-b gap-x-4 items-start"
            >
              <img
                src={product.imgProduct}
                alt={product.nameProduct}
                className="w-[60px] sm:w-[70px] md:w-[80px] object-cover aspect-square" />
              <div className="flex-1">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold">
                  {product.nameProduct}
                </h3>
                <p className="p-base text-gray-700">
                  {product.description}
                </p>
                <p className="p-base font-bold whitespace-nowrap">
                  ${product.priceProduct.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col justify-between items-end self-center text-right gap-2">
                <button onClick={() => handleRemoveButton(product.idProduct)}>
                  <img
                    src="/icons/trash.svg"
                    alt="Eliminar"
                    className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity duration-200" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <OrderComponent productsNumber={products.length} /></>
      ) : (
        <p className="text-gray-500 p-large">No tienes productos en el carrito.</p>
      )}
      {products.length > 0 && (
        <div className="flex justify-center items-center mt-6 flex-wrap gap-4">
          {totalPages > 1 && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 text-xs sm:text-sm lg:px-3 lg:py-1 md:text-base rounded border disabled:opacity-50"
              >
                ←
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-2 py-1 text-xs sm:text-sm lg:px-3 lg:py-1 lg:text-base rounded border ${
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
                className="px-2 py-1 text-xs sm:text-sm lg:px-3 lg:py-1 lg:text-base rounded border disabled:opacity-50"
              >
                →
              </button>
            </div>
          )}
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
            <h3 className="text-center">
              ¿Estás seguro de que deseas eliminar este producto del carrito?
            </h3>
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
