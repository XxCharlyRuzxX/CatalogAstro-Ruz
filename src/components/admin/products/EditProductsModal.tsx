import { useEffect, useState } from "react";
import type { Product, ProductDTO } from "@/lib/interfaces";
import {
  productService,
  type GetProductsParams,
} from "@/lib/service/productService";
import ProductFormModal from "./ProductFormModal";

interface EditProductsModalProps {
  readonly productId: string;
  readonly isOpen: boolean;
  readonly CloseModal: () => void;
  readonly onSubmit: (product: ProductDTO) => Promise<void>;
}

export default function EditProductsModal({
  productId,
  isOpen,
  CloseModal,
  onSubmit,
}: EditProductsModalProps) {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchProduct = async () => {
      const params: GetProductsParams = { id: productId };
      const fetchedProduct = await productService.getById(params);
      setProduct(fetchedProduct);
    };

    if (isOpen && productId) {
      fetchProduct();
    }
  }, [isOpen, productId]);

  return (
    <ProductFormModal
      isOpen={isOpen}
      CloseModal={CloseModal}
      onSubmit={onSubmit}
      title="Editar producto"
      submitLabel="Guardar cambios"
      initialProduct={product}
    />
  );
}
