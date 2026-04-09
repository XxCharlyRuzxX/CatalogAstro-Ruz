import { c as createComponent } from './astro-component_BAbbPMuy.mjs';
import 'piccolore';
import { _ as renderTemplate, J as maybeRenderHead } from './sequence_iKDpAx54.mjs';
import { r as renderComponent } from './entrypoint_vhKjYpg_.mjs';
import { $ as $$Layout } from './Layout_BOvz6eOB.mjs';

const $$Myproducts = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-10 lg:mx-20 mt-5 mb-30"> <h1 class="font-bold mb-4 pt-8 text-center">
Administrar Productos
</h1> ${renderComponent($$result2, "ProductsAdminTable", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "@/components/admin/products/ProductsAdminTable", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/usuario/Downloads/CatalogoAstro/catalog-astro/src/pages/admin/myproducts.astro", void 0);

const $$file = "/Users/usuario/Downloads/CatalogoAstro/catalog-astro/src/pages/admin/myproducts.astro";
const $$url = "/admin/myproducts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Myproducts,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
