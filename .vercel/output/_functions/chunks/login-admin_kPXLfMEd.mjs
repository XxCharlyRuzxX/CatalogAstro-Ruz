import { c as createComponent } from './astro-component_BAbbPMuy.mjs';
import 'piccolore';
import { _ as renderTemplate, J as maybeRenderHead } from './sequence_iKDpAx54.mjs';
import { r as renderComponent } from './entrypoint_vhKjYpg_.mjs';
import { $ as $$Layout } from './Layout_BOvz6eOB.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$LoginAdmin = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<section class="bg-[#F1F6F6] px-4 pt-10 pb-6 sm:px-6 lg:px-8"> <div class="mx-auto max-w-3xl text-center"> <p class="text-xs uppercase tracking-[0.24em] text-[#6F7E79]">\nAdministración\n</p> <h1 class="mt-3 text-4xl font-light leading-tight text-[#2F3433] sm:text-5xl lg:text-6xl">\nAcceso al Panel\n</h1> <p class="mt-4 text-sm uppercase tracking-[0.18em] text-[#7E8C87] sm:text-base">\nIngresa tus credenciales para continuar\n</p> </div> </section> <section class="bg-[#F1F6F6] px-4 pb-14 sm:px-6 lg:px-8"> <div class="mx-auto max-w-md"> <form id="admin-login-form" class="rounded-[28px] bg-white/80 px-6 py-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:px-8"> <div class="mb-8 text-center"> <h2 class="text-2xl font-medium text-[#2F3433] sm:text-3xl">\nBienvenido Administrador\n</h2> <p class="mt-3 text-sm leading-6 text-[#6B7773] sm:text-base">\nPor favor, ingresa la contraseña de administrador para continuar.\n</p> </div> <div class="flex flex-col gap-2"> <label for="password" class="text-sm font-medium text-[#2F3433]">\nContraseña\n</label> <input id="password" type="password" name="password" placeholder="Contraseña de administrador" class="h-12 w-full rounded-2xl border border-[#D9E1DE] bg-[#FAFBFA] px-4 text-sm text-[#2F3433] outline-none transition placeholder:text-[#A0AAA6] focus:border-[#AFC4BD] focus:ring-2 focus:ring-[#DCE7E2]" required> </div> <button type="submit" class="mt-6 w-full rounded-2xl bg-[#2C3E3A] px-5 py-3 text-sm uppercase tracking-[0.12em] text-white transition-all duration-300 hover:scale-[1.01] hover:bg-[#243531]">\nEntrar\n</button> <p id="error-msg" class="mt-4 hidden text-center text-sm text-[#8B4A4A]">\nContraseña incorrecta\n</p> </form> </div> </section> <script type="module">\n    const form = document.querySelector("#admin-login-form");\n    const errorMsg = document.querySelector("#error-msg");\n\n    form.addEventListener("submit", async (e) => {\n      e.preventDefault();\n      const formData = new FormData(form);\n\n      const res = await fetch("/api/admin/login", {\n        method: "POST",\n        body: formData,\n      });\n\n      if (res.ok) {\n        window.location.href = "/";\n      } else {\n        errorMsg.classList.remove("hidden");\n        errorMsg.textContent = "Contraseña incorrecta";\n        setTimeout(() => {\n          errorMsg.classList.add("hidden");\n        }, 3000);\n      }\n    });\n  <\/script> '])), maybeRenderHead()) })}`;
}, "/Users/usuario/Downloads/CatalogoAstro/catalog-astro/src/pages/login-admin.astro", void 0);

const $$file = "/Users/usuario/Downloads/CatalogoAstro/catalog-astro/src/pages/login-admin.astro";
const $$url = "/login-admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$LoginAdmin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
