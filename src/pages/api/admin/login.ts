import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const password = formData.get("password");

  const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD;

  if (password === ADMIN_PASSWORD) {
    cookies.set("admin", "true", {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: import.meta.env.PROD,
      maxAge: 60 * 60 * 24 // 1 día
    });

    return redirect("/");
  }

  return redirect("/admin-login?error=1");
};
