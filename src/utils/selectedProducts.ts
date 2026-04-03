import type { Product } from "@/lib/interfaces";
import { toast } from "react-toastify";

export interface SelectedProduct {
  product: Product;
  quantity: number;
}

const STORAGE_KEY = "productsSelected";
const NUMBER_PHONE = "529992141860";

export function getSelectedProducts(): SelectedProduct[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function setSelectedProducts(products: SelectedProduct[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function addProduct(product: Product): void {
  const current = getSelectedProducts();

  const existing = current.find(
    (item) => item.product.idProduct === product.idProduct,
  );

  if (existing) {
    toast.info(`"${product.nameProduct}" ya está en el carrito` , { style: {
      background: "#0F6C74",
    }});
  } else {
    current.push({
      product,
      quantity: 1,
    });
    toast.success(`"${product.nameProduct}" añadido al carrito`, {
      style: {
        background: "#2C3E3A",
      },
    });
  }

  setSelectedProducts(current);
}

export function increaseProductQuantity(id: string): void {
  const current = getSelectedProducts();

  const updated = current.map((item) =>
    item.product.idProduct === id
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
