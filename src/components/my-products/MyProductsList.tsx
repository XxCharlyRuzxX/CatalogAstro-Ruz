import { useState } from "react";
import {
  getSelectedProducts,
  removeProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
  type SelectedProduct,
} from "@/utils/selectedProducts";
import ConfirmationModal from "../react-components/ConfirmationModal";
import OrderComponent from "./OrderComponet";
import { Minus, Plus, X } from "lucide-react";
import { GlobalToast } from "../GlobalToast";

interface MyProductsListProps {
  readonly products: SelectedProduct[];
  readonly setProducts: (products: SelectedProduct[]) => void;
}

export default function MyProductsList({
  products,
  setProducts,
}: MyProductsListProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [productToRemoveId, setProductToRemoveId] = useState<string | null>(
    null,
  );

  const totalProducts = products.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = products.reduce(
    (total, item) => total + item.product.priceProduct * item.quantity,
    0,
  );

  const handleRemoveButton = (id: string) => {
    setProductToRemoveId(id);
    setIsOpenModal(true);
  };

  const handleIncrease = (id: string) => {
    increaseProductQuantity(id);
    setProducts(getSelectedProducts());
  };

  const handleDecrease = (id: string) => {
    decreaseProductQuantity(id);
    setProducts(getSelectedProducts());
  };

  const handleModalAccept = () => {
    if (!productToRemoveId) return;
    removeProduct(productToRemoveId);
    setProducts(getSelectedProducts());
    setIsOpenModal(false);
    setProductToRemoveId(null);
    GlobalToast.success("Producto eliminado del carrito");
  };

  if (products.length === 0) {
    return (
      <div className="px-6 py-12 text-center min-h-[30vh] rounded-[28px] bg-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
        <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[#7E8C87]">
          No tienes productos en el carrito.
        </p>
        <a
          href="/catalog"
          className="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#0F6C74] transition hover:text-[#0C5960]"
        >
          Seguir comprando →
        </a>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-medium text-[#2F3433] sm:text-3xl">
          Selección actual
        </h2>

        <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[#7E8C87]">
          {totalProducts} producto{totalProducts === 1 ? "" : "s"}
        </p>
      </div>

      <div>
        <ul className="flex flex-col gap-5 md:w-3/5 md:justify-center">
          {products.map((item) => {
            const { product, quantity } = item;
            const lineTotal = product.priceProduct * quantity;

            return (
              <li key={product.idProduct} className="flex items-start gap-4">
                <img
                  src={product.imgProduct}
                  alt={product.nameProduct}
                  className="h-24 w-24 rounded-2xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-medium text-[#2F3433]">
                        {product.nameProduct}
                      </h3>

                      {product.description && (
                        <p className="mt-1 line-clamp-2 text-sm text-[#6B7773]">
                          {product.description}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleRemoveButton(product.idProduct)}
                      className="text-[#8A8E8B] hover:text-[#2F3433]"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 rounded-full bg-[#F1F3F2] px-3 py-2">
                      <button
                        onClick={() => handleDecrease(product.idProduct)}
                        className="text-[#2F3433]"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <span className="min-w-[20px] text-center text-sm font-medium text-[#2F3433]">
                        {quantity}
                      </span>

                      <button
                        onClick={() => handleIncrease(product.idProduct)}
                        className="text-[#2F3433]"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-lg font-medium text-[#0F6C74]">
                      ${lineTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <a
          href="/catalog"
          className="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#0F6C74] transition hover:text-[#0C5960]"
        >
          Seguir comprando →
        </a>
      </div>

      <div className="mt-5 pt-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#7E8C87]">
              Total
            </p>

            <h3 className="mt-2 text-3xl font-medium text-[#2F3433]">
              ${totalPrice.toFixed(2)}
            </h3>
          </div>
        </div>

        <div className="mt-6">
          <OrderComponent productsNumber={totalProducts} />
        </div>
      </div>

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
          <div className="text-center">
            ¿Eliminar este producto del carrito?
          </div>
        </ConfirmationModal>
      )}
    </div>
  );
}
