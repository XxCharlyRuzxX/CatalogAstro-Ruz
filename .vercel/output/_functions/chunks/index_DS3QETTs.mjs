import { c as createComponent } from './astro-component_BAbbPMuy.mjs';
import 'piccolore';
import { J as maybeRenderHead, _ as renderTemplate } from './sequence_iKDpAx54.mjs';
import { r as renderComponent } from './entrypoint_vhKjYpg_.mjs';
import 'clsx';
import { $ as $$Image } from './_astro_assets_Bl2vvbik.mjs';
import { p as productService } from './productService_CFbgBx1X.mjs';
import { $ as $$Layout } from './Layout_BOvz6eOB.mjs';

const $$AboutUs = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="bg-[#2C3E3A] px-4 py-16 sm:px-6 lg:px-8"> <div class="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2"> <div class="order-2 lg:order-1"> <p class="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#a3aba8] sm:text-xs">
Acerca de nosotros
</p> <h2 class="max-w-[14ch] text-3xl font-light leading-tight text-[#F1F6F6] sm:text-4xl">
Una tienda pensada para destacar calidad, estilo y sencillez
</h2> <p class="mt-5 text-sm leading-7 text-[#a3aba8] sm:text-base">
Nuestra propuesta busca ofrecer una experiencia de compra visualmente atractiva, moderna y fácil de usar, especialmente desde dispositivos móviles.
</p> <p class="mt-4 text-sm leading-7 text-[#a3aba8] sm:text-base">
Seleccionamos productos con atención al detalle y construimos una interfaz clara para que explorar, descubrir y comprar resulte natural en cualquier pantalla.
</p> <a href="/catalog" class="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#f1f6f6] transition hover:text-[#a3aba8]">
Explorar catálogo
<span aria-hidden="true">→</span> </a> </div> </div> </section>`;
}, "/Users/usuario/Downloads/CatalogoAstro/catalog-astro/src/components/main-page/AboutUs.astro", void 0);

const $$HeroMain = createComponent(($$result, $$props, $$slots) => {
  const heroImage = "/images/libelulaFondo.jpg";
  return renderTemplate`${maybeRenderHead()}<section class="relative min-h-[70vh] w-full overflow-hidden"> ${renderComponent($$result, "Image", $$Image, { "src": heroImage, "alt": "Imagen principal de la tienda", "class": "absolute inset-0 h-full w-full object-cover", "loading": "eager", "width": 1200, "height": 800 })} <div class="absolute inset-0 bg-black/35"></div> <div class="relative z-10 flex min-h-[90vh] items-center px-5 py-14 sm:px-8 lg:min-h-[100vh] lg:px-16"> <div class="max-w-xl text-white"> <p class="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#E8DDD1] sm:text-xs">
Nueva colección
</p> <h1 class="max-w-[12ch] text-4xl leading-tight font-light sm:text-5xl lg:text-6xl">
Descubre productos que transforman tu rutina
</h1> <p class="mt-4 max-w-md text-sm leading-6 text-[#F5EFE8] sm:text-base">
Encuentra tus favoritos en una experiencia más limpia, moderna y enfocada en lo esencial.
</p> <a href="/catalog" class="mt-8 inline-flex items-center justify-center rounded-full bg-[#0F6C74] px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:bg-[#0C5960]">
Ir al catálogo
</a> </div> </div> </section>`;
}, "/Users/usuario/Downloads/CatalogoAstro/catalog-astro/src/components/main-page/HeroMain.astro", void 0);

const $$ProductCardMinimal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProductCardMinimal;
  const { product } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="overflow-hidden rounded-2xl bg-[#747877] transition-transform duration-300 group-hover:scale-[1.02] hover:shadow-lg hover:scale-[1.02]"> <div class="w-full aspect-[3/2] overflow-hidden"> ${renderComponent($$result, "Image", $$Image, { "src": product.imgProduct, "alt": product.nameProduct, "class": "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105", "loading": "lazy", "width": 600, "height": 400 })} </div> </div>`;
}, "/Users/usuario/Downloads/CatalogoAstro/catalog-astro/src/components/main-page/ProductCardMinimal.astro", void 0);

const $$PopularProducts = createComponent(async ($$result, $$props, $$slots) => {
  const params = {
    filtredbyCategory: "Populares"
  };
  const products = await productService.getAll(params);
  return renderTemplate`${maybeRenderHead()}<section class="bg-[#F1F6F6] px-4 py-16 sm:px-6 lg:px-8"> <div class="mx-auto max-w-7xl"> <div class="mb-10 text-center"> <p class="mb-2 text-[11px] uppercase tracking-[0.35em] text-[#7D7A73]">
Lo mas popular
</p> <h2 class="text-3xl font-light text-[#1E1E1C] sm:text-4xl">
En Tendencia
</h2> <p class="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6B6A66] sm:text-base">
Una selección de nuestros productos populares con una presentación más limpia y actual.
</p> </div> <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-10"> ${products.slice(0, 8).map((product) => renderTemplate`${renderComponent($$result, "ProductCardMinimal", $$ProductCardMinimal, { "product": product })}`)} </div> </div> </section>`;
}, "/Users/usuario/Downloads/CatalogoAstro/catalog-astro/src/components/main-page/PopularProducts.astro", void 0);

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroMain", $$HeroMain, {})} ${renderComponent($$result2, "PopularProducts", $$PopularProducts, {})} ${renderComponent($$result2, "AboutUs", $$AboutUs, {})} ` })}`;
}, "/Users/usuario/Downloads/CatalogoAstro/catalog-astro/src/pages/index.astro", void 0);

const $$file = "/Users/usuario/Downloads/CatalogoAstro/catalog-astro/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
