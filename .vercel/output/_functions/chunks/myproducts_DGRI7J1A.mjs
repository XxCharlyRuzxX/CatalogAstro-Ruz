import { c as createComponent } from './astro-component_BAbbPMuy.mjs';
import 'piccolore';
import { _ as renderTemplate, J as maybeRenderHead } from './sequence_iKDpAx54.mjs';
import { r as renderComponent } from './entrypoint_vhKjYpg_.mjs';
import { $ as $$Layout } from './Layout_BOvz6eOB.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { o as orderViaWhatsApp, i as increaseProductQuantity, g as getSelectedProducts, d as decreaseProductQuantity, r as removeProduct, s as syncAndGetCart } from './selectedProducts_BwdH_PzR.mjs';
import { C as ConfirmationModal } from './ConfirmationModal_CSg9xT3v.mjs';
import { X, MessageCircle, MessageCircleMore, Minus, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

function OrderProductsModal({
  isOpen,
  CloseModal
}) {
  const [form, setForm] = useState({ name: "", comment: "" });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const MAX_WORDS = 50;
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };
  const handleCommentChange = (e) => {
    const value = e.target.value;
    const words = value.trim().split(/\s+/).filter(Boolean);
    if (words.length <= MAX_WORDS) {
      setForm({ ...form, comment: value });
    }
  };
  const handleConfirmOrder = () => {
    orderViaWhatsApp(form.name, form.comment);
    setOrderSent(true);
    setShowConfirmModal(false);
    setTimeout(() => {
      setForm({ name: "", comment: "" });
      setOrderSent(false);
      CloseModal();
    }, 3e3);
  };
  if (!isOpen) return null;
  const wordsCount = form.comment.trim().split(/\s+/).filter(Boolean).length;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-lg rounded-[28px] bg-white px-6 py-7 shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:px-8", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: CloseModal,
          className: "absolute right-4 top-4 rounded-full p-2 text-[#7E8C87] transition hover:bg-[#F1F3F2] hover:text-[#2F3433]",
          "aria-label": "Cerrar modal",
          children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
        }
      ),
      orderSent ? /* @__PURE__ */ jsxs("div", { className: "py-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F3EF]", children: /* @__PURE__ */ jsx(MessageCircle, { className: "h-7 w-7 text-[#0F6C74]" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-medium text-[#2F3433]", children: "¡Pedido enviado!" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-6 text-[#6B7773] sm:text-base", children: "Estás siendo redirigido a WhatsApp para completar tu pedido." })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "text-[#2F3433]", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F3EF]", children: /* @__PURE__ */ jsx(MessageCircle, { className: "h-7 w-7 text-[#0F6C74]" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-[#7E8C87]", children: "Pedido" }),
          /* @__PURE__ */ jsx("h2", { className: "mt-2 text-2xl font-medium leading-tight sm:text-3xl", children: "Completa tu pedido por WhatsApp" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-6 text-[#6B7773] sm:text-base", children: "Ingresa tus datos para generar el mensaje de pedido y continuar con la compra." })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleFormSubmit, className: "flex flex-col gap-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "fullName",
                className: "text-sm font-medium text-[#2F3433]",
                children: "Nombre completo"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "fullName",
                type: "text",
                placeholder: "Tu nombre completo",
                value: form.name,
                onChange: (e) => setForm({ ...form, name: e.target.value }),
                required: true,
                className: "h-12 rounded-2xl border border-[#D9E1DE] bg-[#FAFBFA] px-4 text-sm text-[#2F3433] outline-none transition placeholder:text-[#A0AAA6] focus:border-[#AFC4BD] focus:ring-2 focus:ring-[#DCE7E2]"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "comment",
                className: "text-sm font-medium text-[#2F3433]",
                children: "Comentario de entrega"
              }
            ),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "comment",
                placeholder: "Escribe una referencia o comentario breve",
                value: form.comment,
                onChange: handleCommentChange,
                className: "min-h-28 resize-none rounded-2xl border border-[#D9E1DE] bg-[#FAFBFA] px-4 py-3 text-sm text-[#2F3433] outline-none transition placeholder:text-[#A0AAA6] focus:border-[#AFC4BD] focus:ring-2 focus:ring-[#DCE7E2]"
              }
            ),
            /* @__PURE__ */ jsxs("p", { className: "text-right text-xs text-[#7E8C87]", children: [
              wordsCount,
              "/",
              MAX_WORDS,
              " palabras"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "mt-2 w-full rounded-2xl bg-[#2C3E3A] px-5 py-3 text-sm uppercase tracking-[0.12em] text-white transition-all duration-300 hover:scale-[1.01] hover:bg-[#243531]",
              children: "Confirmar pedido"
            }
          )
        ] })
      ] })
    ] }) }),
    showConfirmModal && /* @__PURE__ */ jsx(
      ConfirmationModal,
      {
        onConfirm: handleConfirmOrder,
        onCancel: () => setShowConfirmModal(false),
        textButtonConfirm: "Continuar",
        textButtonCancel: "Cancelar",
        children: /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-center text-sm leading-6 text-[#5F6A66]", children: [
          /* @__PURE__ */ jsx("p", { children: "A continuación serás redirigido a WhatsApp para completar tu pedido." }),
          /* @__PURE__ */ jsx("p", { children: "Se generará automáticamente el mensaje con tus productos y se vaciará tu carrito." }),
          /* @__PURE__ */ jsx("p", { className: "pt-1 font-medium text-[#2F3433]", children: "¿Deseas continuar?" })
        ] })
      }
    )
  ] });
}

function OrderComponent({
  productsNumber
}) {
  const [openModal, setOpenModal] = useState(false);
  const handleButtonClick = () => {
    if (productsNumber < 1) {
      toast.error("No tienes productos en el carrito");
      return;
    }
    setOpenModal(true);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-4 w-full", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: handleButtonClick,
        className: "w-full rounded-2xl bg-[#2C3E3A] px-6 py-4 text-white flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300\n        hover:scale-[1.02] hover:bg-[#075E54]",
        children: [
          /* @__PURE__ */ jsx(MessageCircleMore, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm sm:text-base tracking-[0.12em] uppercase", children: "Pedir por WhatsApp" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      OrderProductsModal,
      {
        isOpen: openModal,
        CloseModal: () => setOpenModal(false)
      }
    )
  ] });
}

function MyProductsList({
  products,
  setProducts
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [productToRemoveId, setProductToRemoveId] = useState(
    null
  );
  const totalProducts = products.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = products.reduce(
    (total, item) => total + item.product.priceProduct * item.quantity,
    0
  );
  const handleRemoveButton = (id) => {
    setProductToRemoveId(id);
    setIsOpenModal(true);
  };
  const handleIncrease = (id) => {
    increaseProductQuantity(id);
    setProducts(getSelectedProducts());
  };
  const handleDecrease = (id) => {
    decreaseProductQuantity(id);
    setProducts(getSelectedProducts());
  };
  const handleModalAccept = () => {
    if (!productToRemoveId) return;
    removeProduct(productToRemoveId);
    setProducts(getSelectedProducts());
    setIsOpenModal(false);
    setProductToRemoveId(null);
    toast.success("Producto eliminado del carrito", {
      style: {
        background: "#2C3E3A"
      }
    });
  };
  if (products.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "px-6 py-12 text-center min-h-[30vh] rounded-[28px] bg-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)]", children: [
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm uppercase tracking-[0.2em] text-[#7E8C87]", children: "No tienes productos en el carrito." }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/catalog",
          className: "mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#0F6C74] transition hover:text-[#0C5960]",
          children: "Seguir comprando →"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-medium text-[#2F3433] sm:text-3xl", children: "Selección actual" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm uppercase tracking-[0.2em] text-[#7E8C87]", children: [
        totalProducts,
        " producto",
        totalProducts === 1 ? "" : "s"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-5 md:w-3/5 md:justify-center", children: products.map((item) => {
        const { product, quantity } = item;
        const lineTotal = product.priceProduct * quantity;
        return /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: product.imgProduct,
              alt: product.nameProduct,
              className: "h-24 w-24 rounded-2xl object-cover"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-[#2F3433]", children: product.nameProduct }),
                product.description && /* @__PURE__ */ jsx("p", { className: "mt-1 line-clamp-2 text-sm text-[#6B7773]", children: product.description })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleRemoveButton(product.idProduct),
                  className: "text-[#8A8E8B] hover:text-[#2F3433]",
                  children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-full bg-[#F1F3F2] px-3 py-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDecrease(product.idProduct),
                    className: "text-[#2F3433]",
                    "aria-label": "Disminuir cantidad",
                    children: /* @__PURE__ */ jsx(Minus, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "min-w-[20px] text-center text-sm font-medium text-[#2F3433]", children: quantity }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleIncrease(product.idProduct),
                    className: "text-[#2F3433]",
                    "aria-label": "Aumentar cantidad",
                    children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-lg font-medium text-[#0F6C74]", children: [
                "$",
                lineTotal.toFixed(2)
              ] })
            ] })
          ] })
        ] }, product.idProduct);
      }) }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/catalog",
          className: "mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#0F6C74] transition hover:text-[#0C5960]",
          children: "Seguir comprando →"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 pt-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-end justify-between", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-[#7E8C87]", children: "Total" }),
        /* @__PURE__ */ jsxs("h3", { className: "mt-2 text-3xl font-medium text-[#2F3433]", children: [
          "$",
          totalPrice.toFixed(2)
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(OrderComponent, { productsNumber: totalProducts }) })
    ] }),
    isOpenModal && productToRemoveId && /* @__PURE__ */ jsx(
      ConfirmationModal,
      {
        textButtonConfirm: "Eliminar",
        textButtonCancel: "Cancelar",
        onConfirm: handleModalAccept,
        onCancel: () => {
          setIsOpenModal(false);
          setProductToRemoveId(null);
        },
        children: /* @__PURE__ */ jsx("div", { className: "text-center", children: "¿Eliminar este producto del carrito?" })
      }
    )
  ] });
}

function MyProductsComponent() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    syncAndGetCart().then((freshProducts) => {
      setProducts(freshProducts);
    });
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "pt-8 min-h-[70vh]", children: /* @__PURE__ */ jsx(MyProductsList, { products, setProducts }) });
}

const prerender = false;
const $$Myproducts = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-[#2C3E3A] px-6 pt-10 pb-8"> <div class="mx-auto max-w-4xl justify-center text-center"> <p class="text-xs uppercase tracking-[0.24em] text-[#a3aba8]">Carrito</p> <h1 class="mt-3 text-4xl font-light leading-tight text-[#F4F1EC] sm:text-5xl lg:text-6xl">
Tus Productos
</h1> <p class="mt-4 text-sm  tracking-[0.18em] text-[#a3aba8] sm:text-base">
Revisa tu selección antes de realizar tu pedido
</p> </div> </section> <section class="bg-[#F1F6F6] px-6 pb-14 sm:px-6 lg:px-8"> <div class="mx-auto max-w-6xl"> ${renderComponent($$result2, "MyProductsComponent", MyProductsComponent, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/my-products/MyProductsComponent", "client:component-export": "default" })} </div> </section> ` })}`;
}, "/Users/usuario/Downloads/CatalogoAstro/catalog-astro/src/pages/myproducts.astro", void 0);

const $$file = "/Users/usuario/Downloads/CatalogoAstro/catalog-astro/src/pages/myproducts.astro";
const $$url = "/myproducts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Myproducts,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
