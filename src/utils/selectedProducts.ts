import { GlobalToast } from "@/components/GlobalToast";
import type { Product } from "@/lib/interfaces";
import { productService } from "@/lib/service/productService";

export interface SelectedProduct {
  product: Product;
  quantity: number;
}

export const STORAGE_KEY = "productsSelected";
const NUMBER_PHONE = "529992141860";

export function getSelectedProducts(): SelectedProduct[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export async function syncAndGetCart(): Promise<SelectedProduct[]> {
  const currentCart = getSelectedProducts();

  if (currentCart.length === 0) return [];

  try {
    const freshCartPromises = currentCart.map(async (item) => {
      try {
        const freshProduct = await productService.getById(
          item.product.idProduct
        );

        // 1. Manejar explícitamente el stock 0 para AVISAR al usuario
        if (freshProduct.stock === 0) {
          GlobalToast.error(
            `El producto "${item.product.nameProduct}" se ha agotado y fue removido del carrito.`,
          );
          return null; // Lo marcamos para eliminar
        }

        const validQuantity = Math.min(item.quantity, freshProduct.stock);

        // Opcional (Buena UX): Avisar si la cantidad se tuvo que reducir
        if (validQuantity < item.quantity) {
          GlobalToast.info(
            `La cantidad de "${item.product.nameProduct}" se ajustó a ${validQuantity} por límite de stock.`,
          );
        }

        return {
          product: freshProduct,
          quantity: validQuantity,
        };
      } catch (error: any) {
        // 2. Diferenciar entre "Producto no encontrado (404)" y "Fallo de red/servidor"
        // NOTA: Ajusta `error.status === 404` a cómo tu cliente HTTP maneje los errores (ej. error.response.status en Axios)
        const isNotFoundError =
          error?.response?.status === 404 || error?.status === 404;

        if (isNotFoundError) {
          GlobalToast.error(
            `El producto "${item.product.nameProduct}" ya no está disponible en la tienda.`,
          );
          return null;
        } else {
          throw error;
        }
      }
    });

    const resolvedCart = await Promise.all(freshCartPromises);

    const validCart = resolvedCart.filter(
      (item): item is SelectedProduct => item !== null,
    );

    setSelectedProducts(validCart);

    return validCart;
  } catch (error) {
    console.error("Error de conexión al sincronizar el carrito:", error);
    GlobalToast.error("Hubo un problema de conexión al actualizar tu carrito.");
    return currentCart;
  }
}

export function setSelectedProducts(products: SelectedProduct[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function addProduct(product: Product): void {
  if (product.stock === 0) {
    GlobalToast.error(`Lo sentimos, "${product.nameProduct}" está agotado.`);
    return;
  }

  const current = getSelectedProducts();

  const existing = current.find(
    (item) => item.product.idProduct === product.idProduct,
  );

  if (existing) {
    GlobalToast.info(`"${product.nameProduct}" ya está en el carrito`);
  } else {
    const updatedProducts = [
      ...current,
      {
        product,
        quantity: 1,
      },
    ];

    GlobalToast.success(`"${product.nameProduct}" añadido al carrito`);
    setSelectedProducts(updatedProducts);
  }
}

export function increaseProductQuantity(id: string): void {
  const current = getSelectedProducts();

  const updated = current.map((item) =>
    item.product.idProduct === id && item.quantity < item.product.stock
      ? { ...item, quantity: item.quantity + 1 }
      : item,
  );
  setSelectedProducts(updated);
}

export function decreaseProductQuantity(id: string): void {
  const current = getSelectedProducts();

  const updated = current
    .map((item) =>
      item.product.idProduct === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    )
    .filter((item) => item.quantity > 0);

  setSelectedProducts(updated);
}

export function removeProduct(id: string): void {
  const current = getSelectedProducts();
  const updated = current.filter((item) => item.product.idProduct !== id);
  setSelectedProducts(updated);
}

export function clearCart(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function orderViaWhatsApp(
  clientName: string,
  descriptionOrder?: string,
): void {
  const products = getSelectedProducts();
  if (products.length === 0) return;

  const total = products
    .reduce((acc, item) => acc + item.product.priceProduct * item.quantity, 0)
    .toFixed(2);

  const productList = products
    .map(
      (item) =>
        `• ${item.product.nameProduct} x${item.quantity} - $${(
          item.product.priceProduct * item.quantity
        ).toFixed(2)}`,
    )
    .join("\n");

  const intro = `¡Hola! Mi nombre es *${clientName}* y me gustaría hacer el siguiente pedido:\n\n`;
  const productsText = `${productList}\n\n`;
  const totalText = `* El Precio Total de mi pedido es :* $${total}\n`;
  const commentText = descriptionOrder?.trim()
    ? `\n📝 *Comentario de mi pedido:* ${descriptionOrder.trim()}`
    : "";

  const fullMessage = `${intro}${productsText}${totalText}${commentText}`;
  const encodedMessage = encodeURIComponent(fullMessage);
  const whatsappURL = `https://wa.me/${NUMBER_PHONE}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
  clearCart();
}
