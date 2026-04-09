import { c as createComponent } from './astro-component_BAbbPMuy.mjs';
import 'piccolore';
import { _ as renderTemplate, J as maybeRenderHead } from './sequence_iKDpAx54.mjs';
import { r as renderComponent } from './entrypoint_vhKjYpg_.mjs';
import { $ as $$Layout } from './Layout_BOvz6eOB.mjs';

const $$Panel = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-[#F1F6F6] px-4 pt-10 pb-6 sm:px-6 lg:px-8"> <div class="mx-auto max-w-4xl text-center"> <p class="text-xs uppercase tracking-[0.24em] text-[#6F7E79]">
Administración
</p> <h1 class="mt-3 text-4xl font-light leading-tight text-[#2F3433] sm:text-5xl lg:text-6xl">
Panel de Control
</h1> <p class="mt-4 text-sm uppercase tracking-[0.18em] text-[#7E8C87] sm:text-base">
Gestiona productos y categorías desde un solo lugar
</p> </div> </section> <section class="bg-[#F1F6F6] px-4 pb-14 sm:px-6 lg:px-8"> <div class="mx-auto max-w-7xl"> <div class="mb-8 flex justify-center"> ${renderComponent($$result2, "LogoutButton", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "@/components/admin/LogoutButton", "client:component-export": "default" })} </div> ${renderComponent($$result2, "AdminTabs", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "@/components/admin/AdminTabs", "client:component-export": "default" })} </div> </section> ` })}`;
}, "/Users/usuario/Downloads/CatalogoAstro/catalog-astro/src/pages/admin/panel.astro", void 0);

const $$file = "/Users/usuario/Downloads/CatalogoAstro/catalog-astro/src/pages/admin/panel.astro";
const $$url = "/admin/panel";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Panel,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
