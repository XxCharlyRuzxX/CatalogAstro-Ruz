import { c as createComponent } from './astro-component_BAbbPMuy.mjs';
import 'piccolore';
import { _ as renderTemplate, J as maybeRenderHead } from './sequence_iKDpAx54.mjs';
import { r as renderComponent } from './entrypoint_vhKjYpg_.mjs';
import { $ as $$Layout } from './Layout_BOvz6eOB.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { p as productService } from './productService_CFbgBx1X.mjs';
import { c as categoryService } from './categoryService_C9YDck7X.mjs';
import { Search, Plus } from 'lucide-react';
import { a as addProduct } from './selectedProducts_BwdH_PzR.mjs';

function SearchCatalog({ onChangeParams }) {
  const handleChange = (event) => {
    onChangeParams({
      searchTerm: event.target.value
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center bg-[#2C3E3A] w-full pb-10 md:pb-15", children: /* @__PURE__ */ jsxs("div", { className: "relative w-4/5 max-w-2xl", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        onChange: handleChange,
        placeholder: "Buscar productos...",
        className: "h-14 w-full rounded-full border border-[#E4E1DC] bg-white pl-14 pr-5 text-sm text-[#3E3A37] outline-none transition placeholder:text-[#B7B2AB] focus:border-[#BFCFC9] focus:ring-2 focus:ring-[#DCE7E2]"
      }
    ),
    /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8A8883]" })
  ] }) });
}

function SelectCategories({
  handleCategoryChange,
  selectedCategory,
  categories
}) {
  return /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 sm:gap-3 justify-center", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => handleCategoryChange("all"),
        className: `rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] transition sm:px-5 sm:py-2.5 sm:text-xs ${selectedCategory === "all" ? "bg-[#0F6C74] text-white shadow-[0_6px_16px_rgba(79,195,123,0.22)]" : "bg-white text-[#2F3433] hover:bg-[#ECE8E2]"}`,
        children: "Todas"
      }
    ),
    categories.map((category) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => handleCategoryChange(category.id),
        className: `rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] transition sm:px-5 sm:py-2.5 sm:text-xs ${selectedCategory === category.id ? "bg-[#0F6C74] text-white shadow-[0_6px_16px_rgba(79,195,123,0.22)]" : "bg-white text-[#2F3433] hover:bg-[#ECE8E2]"}`,
        children: category.name
      },
      category.id
    ))
  ] }) });
}

function AddToCartButton({ product }) {
  const handleAddToCart = () => {
    addProduct(product);
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      className: "absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105",
      onClick: handleAddToCart,
      children: /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5 text-[#2F3433]" })
    }
  );
}

function ProductCard({ product }) {
  const [whole, decimal] = product.priceProduct.toFixed(2).split(".");
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-[#646464]", children: [
      /* @__PURE__ */ jsx("picture", { children: /* @__PURE__ */ jsx(
        "img",
        {
          src: product.imgProduct,
          alt: product.nameProduct,
          className: "w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105",
          loading: "lazy"
        }
      ) }),
      /* @__PURE__ */ jsx(AddToCartButton, { product })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 ml-3", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-base font-medium text-[#1E1E1C] leading-snug", children: product.nameProduct }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] uppercase tracking-[0.2em] text-[#8A8883]", children: product.brand }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 text-[#0F6C74] text-sm font-medium", children: [
        "$",
        whole,
        /* @__PURE__ */ jsxs("span", { className: "text-xs", children: [
          ".",
          decimal
        ] })
      ] })
    ] })
  ] });
}

const PRODUCTS_PER_PAGE = 8;
function ProductsCatalogComponent({
  products
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  useEffect(() => {
    setCurrentPage(1);
  }, [products]);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, endIndex);
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    paginatedProducts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4", children: paginatedProducts.map((product) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ProductCard, { product }) }, product.idProduct)) }) : /* @__PURE__ */ jsx("div", { className: "py-12 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-[#6B6A66]", children: "Ningún producto coincide con la búsqueda." }) }),
    totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "mt-12 flex items-center justify-center gap-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handlePrev,
          disabled: currentPage === 1,
          className: "rounded-full bg-[#0F6C74] px-5 py-2 text-sm text-[#F4F1EC] transition hover:bg-[#1694a0] disabled:cursor-not-allowed disabled:opacity-50",
          children: "Anterior"
        }
      ),
      /* @__PURE__ */ jsxs("span", { className: "text-sm text-black", children: [
        "Página ",
        currentPage,
        " de ",
        totalPages
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleNext,
          disabled: currentPage === totalPages,
          className: "rounded-full bg-[#0F6C74] px-5 py-2 text-sm text-[#F4F1EC] transition hover:bg-[#1694a0] disabled:cursor-not-allowed disabled:opacity-50",
          children: "Siguiente"
        }
      )
    ] })
  ] });
}

function CatalogComponent() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const fetchCategories = async () => {
    const data = await categoryService.getAll();
    setCategories(data);
  };
  const fetchAllProducts = async () => {
    const data = await productService.getAll();
    setProducts(data);
  };
  useEffect(() => {
    fetchCategories();
    fetchAllProducts();
  }, []);
  const handleSearchChange = async (params) => {
    const data = await productService.getAll(params);
    setProducts(data);
  };
  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === "all") {
      const data2 = await productService.getAll();
      setProducts(data2);
      return;
    }
    const params = {
      filtredbyCategory: categoryId
    };
    const data = await productService.getAll(params);
    setProducts(data);
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full bg-[#F1F6F6]", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx(SearchCatalog, { onChangeParams: handleSearchChange }) }),
    /* @__PURE__ */ jsxs("div", { className: "px-4 sm:px-6 lg:px-8 pb-10", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx(
        SelectCategories,
        {
          handleCategoryChange,
          selectedCategory,
          categories
        }
      ) }),
      /* @__PURE__ */ jsx(ProductsCatalogComponent, { products })
    ] })
  ] });
}

const prerender = false;
const $$Catalog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-[#2C3E3A] px-4 pt-10 pb-6 sm:px-6 lg:px-8"> <div class="mx-auto max-w-3xl text-center md:py-6"> <h1 class="text-4xl sm:text-5xl lg:text-6xl font-light text-[#F4F1EC] leading-tight">
Nuestro Catálogo
</h1> <div class="mx-auto mt-4 h-[2px] w-30 bg-[#8FA39E]"></div> <p class="mt-4 text-xs sm:text-sm tracking-[0.25em] uppercase text-[#a3aba8]">
Productos seleccionados para destacar tu estilo
</p> </div> </section> ${renderComponent($$result2, "CatalogComponent", CatalogComponent, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/catalog/CatalogComponent", "client:component-export": "default" })} ` })}`;
}, "/Users/usuario/Downloads/CatalogoAstro/catalog-astro/src/pages/catalog.astro", void 0);

const $$file = "/Users/usuario/Downloads/CatalogoAstro/catalog-astro/src/pages/catalog.astro";
const $$url = "/catalog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Catalog,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
