import { p as productService } from './productService_CFbgBx1X.mjs';
import { toast } from 'react-toastify';

const STORAGE_KEY = "productsSelected";
const NUMBER_PHONE = "529992141860";
function getSelectedProducts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}
async function syncAndGetCart() {
  const currentCart = getSelectedProducts();
  if (currentCart.length === 0) return [];
  try {
    const freshCartPromises = currentCart.map(async (item) => {
      try {
        const freshProduct = await productService.getById({
          id: item.product.idProduct
        });
        if (freshProduct.stock === 0) {
          toast.error(
            `El producto "${item.product.nameProduct}" se ha agotado y fue removido del carrito.`
          );
          return null;
        }
        const validQuantity = Math.min(item.quantity, freshProduct.stock);
        if (validQuantity < item.quantity) {
          toast.info(
            `La cantidad de "${item.product.nameProduct}" se ajustó a ${validQuantity} por límite de stock.`
          );
        }
        return {
          product: freshProduct,
          quantity: validQuantity
        };
      } catch (error) {
        const isNotFoundError = error?.response?.status === 404 || error?.status === 404;
        if (isNotFoundError) {
          toast.error(
            `El producto "${item.product.nameProduct}" ya no está disponible en la tienda.`
          );
          return null;
        } else {
          throw error;
        }
      }
    });
    const resolvedCart = await Promise.all(freshCartPromises);
    const validCart = resolvedCart.filter(
      (item) => item !== null
    );
    setSelectedProducts(validCart);
    return validCart;
  } catch (error) {
    console.error("Error de conexión al sincronizar el carrito:", error);
    toast.error("Hubo un problema de conexión al actualizar tu carrito.");
    return currentCart;
  }
}
function setSelectedProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}
function addProduct(product) {
  if (product.stock === 0) {
    toast.error(`Lo sentimos, "${product.nameProduct}" está agotado.`);
    return;
  }
  const current = getSelectedProducts();
  const existing = current.find(
    (item) => item.product.idProduct === product.idProduct
  );
  if (existing) {
    toast.info(`"${product.nameProduct}" ya está en el carrito`, {
      style: {
        background: "#0F6C74"
      }
    });
  } else {
    const updatedProducts = [
      ...current,
      {
        product,
        quantity: 1
      }
    ];
    toast.success(`"${product.nameProduct}" añadido al carrito`, {
      style: {
        background: "#2C3E3A"
      }
    });
    setSelectedProducts(updatedProducts);
  }
}
function increaseProductQuantity(id) {
  const current = getSelectedProducts();
  const updated = current.map(
    (item) => item.product.idProduct === id && item.quantity < item.product.stock ? { ...item, quantity: item.quantity + 1 } : item
  );
  setSelectedProducts(updated);
}
function decreaseProductQuantity(id) {
  const current = getSelectedProducts();
  const updated = current.map(
    (item) => item.product.idProduct === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
  ).filter((item) => item.quantity > 0);
  setSelectedProducts(updated);
}
function removeProduct(id) {
  const current = getSelectedProducts();
  const updated = current.filter((item) => item.product.idProduct !== id);
  setSelectedProducts(updated);
}
function clearCart() {
  localStorage.removeItem(STORAGE_KEY);
}
function orderViaWhatsApp(clientName, descriptionOrder) {
  const products = getSelectedProducts();
  if (products.length === 0) return;
  const total = products.reduce((acc, item) => acc + item.product.priceProduct * item.quantity, 0).toFixed(2);
  const productList = products.map(
    (item) => `• ${item.product.nameProduct} x${item.quantity} - $${(item.product.priceProduct * item.quantity).toFixed(2)}`
  ).join("\n");
  const intro = `¡Hola! Mi nombre es *${clientName}* y me gustaría hacer el siguiente pedido:

`;
  const productsText = `${productList}

`;
  const totalText = `* El Precio Total de mi pedido es :* $${total}
`;
  const commentText = descriptionOrder?.trim() ? `
📝 *Comentario de mi pedido:* ${descriptionOrder.trim()}` : "";
  const fullMessage = `${intro}${productsText}${totalText}${commentText}`;
  const encodedMessage = encodeURIComponent(fullMessage);
  const whatsappURL = `https://wa.me/${NUMBER_PHONE}?text=${encodedMessage}`;
  window.open(whatsappURL, "_blank");
  clearCart();
}

export { addProduct as a, decreaseProductQuantity as d, getSelectedProducts as g, increaseProductQuantity as i, orderViaWhatsApp as o, removeProduct as r, syncAndGetCart as s };
