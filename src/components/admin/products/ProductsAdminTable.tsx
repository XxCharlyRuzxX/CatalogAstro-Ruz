import { useEffect, useState } from "react";
import type { Product, ProductDTO } from "@/lib/interfaces";
import { productService } from "@/lib/service/productService";
import AddProductsButton from "../products/AddProductsButton";
import EditProductsModal from "../products/EditProductsModal";
import ConfirmationModal from "../../react-components/ConfirmationModal";
import SearchAdminProducts from "./SearchAdminProducts";
import ProductsAdminList from "./ProductsAdminList";
import { GlobalToast } from "@/components/GlobalToast";

export default function ProductsAdminSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const fetchAllProducts = async () => {
    const data = await productService.getAll();
    setProducts(data);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleSearchChange = async (searchTerm: string) => {
    const data = await productService.getAll({ searchTerm });
    setProducts(data);
  };

  const onClickDeleteIcon = (productId: string) => {
    setSelectedProductId(productId);
    setIsOpenModalDelete(true);
  };

  const onClickEditIcon = (productId: string) => {
    setSelectedProductId(productId);
    setIsOpenModalEdit(true);
  };

  const onDeleteProduct = async (productId: string | null) => {
    if (!productId) {
      GlobalToast.error("ID de producto no válido");
      return;
    }

    try {
      await productService.delete(productId);
      await fetchAllProducts();
      GlobalToast.success("Producto eliminado correctamente");
    } catch (error) {
      GlobalToast.error("Error al eliminar el producto: " + (error as Error).message);
    }
  };

  const onSubmitEditProduct = async (product: ProductDTO) => {
    if (!selectedProductId) {
      GlobalToast.error("ID de producto no válido");
      return;
    }

    try {
      console.log("Enviando producto editado:", { id: selectedProductId, ...product });
      await productService.update(product);
      await fetchAllProducts();
      GlobalToast.success("Producto actualizado correctamente");
      setIsOpenModalEdit(false);
    } catch (error) {
      GlobalToast.error(
        "Error al actualizar el producto: " + (error as Error).message,
      );
    }
  };

  const onSubmitAddProducts = async (product: ProductDTO) => {
    try {
      await productService.post([product]);
      await fetchAllProducts();
      GlobalToast.success("Producto añadido correctamente");
    } catch (error) {
      GlobalToast.error("Error al añadir el producto: " + (error as Error).message);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex gap-4">
        <div className="flex items-center gap-4">
        <AddProductsButton onSubmit={onSubmitAddProducts} />
        </div>
        <div className="flex items-center gap-4">
        <SearchAdminProducts onSearch={handleSearchChange} />
        </div>
      </div>
      <ProductsAdminList
        products={products}
        onEdit={onClickEditIcon}
        onDelete={onClickDeleteIcon}
      />

      {isOpenModalDelete && (
        <ConfirmationModal
          textButtonConfirm="Eliminar"
          onConfirm={() => {
            onDeleteProduct(selectedProductId);
            setIsOpenModalDelete(false);
          }}
          onCancel={() => setIsOpenModalDelete(false)}
        >
          <div className="flex flex-col items-center justify-center px-4 py-2 text-center">
            <h3 className="mb-3 text-lg font-medium text-[#2F3433]">
              ¿Eliminar este producto?
            </h3>
            <p className="text-sm leading-6 text-[#6B7773]">
              Esta acción no se puede deshacer.
            </p>
          </div>
        </ConfirmationModal>
      )}

      {isOpenModalEdit && selectedProductId && (
        <EditProductsModal
          productId={selectedProductId}
          isOpen={isOpenModalEdit}
          onSubmit={onSubmitEditProduct}
          CloseModal={() => setIsOpenModalEdit(false)}
        />
      )}
    </div>
  );
}
