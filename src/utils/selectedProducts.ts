import type { Product } from "@/lib/interfaces";

const STORAGE_KEY = "productsSelected";
const NUMBER_PHONE = "529992141860";

export function getSelectedProducts(): Product[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function setSelectedProducts(products: Product[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function removeProduct(id: string): void {
  const current = getSelectedProducts();
  const updated = current.filter(p => p.idProduct !== id);
  setSelectedProducts(updated);
}

export function clearCart(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function orderViaWhatsApp(): void {
  const products = getSelectedProducts();
  if (products.length === 0) return;

  const total = products.reduce((acc, p) => acc + p.priceProduct, 0).toFixed(2);
  const message = products
    .map(p => `🛍 ${p.nameProduct} - $${p.priceProduct.toFixed(2)}`)
    .join("\n");

  const fullMessage = `Hola, quiero pedir los siguientes productos:\n\n${message}\n\nTotal: $${total}`;
  const encodedMessage = encodeURIComponent(fullMessage);
  const whatsappURL = `https://wa.me/${NUMBER_PHONE}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
  clearCart();
}
