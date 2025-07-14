import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, redirect }) => {

  cookies.set("token", "", {
    httpOnly: true,
    sameSite: "strict",
    secure: import.meta.env.PROD,
    path: "/",
    maxAge: 0,
  });

  return redirect("/admin/login");
};
