import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";

const SECRET = import.meta.env.JWT_SECRET;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const password = formData.get("password");

  const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD;

  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { role: "admin" },
      SECRET,
      { expiresIn: "1d" }
    );

    cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: import.meta.env.PROD,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return redirect("/");
  }

  return new Response("Contraseña incorrecta", { status: 401 });
};
