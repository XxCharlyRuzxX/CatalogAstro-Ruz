import type { APIRoute } from "astro";
import { verifyToken } from "@/utils/auth";

export const GET: APIRoute = async ({ cookies }) => {
  const token = cookies.get("token")?.value;
  const user = verifyToken(token);

  return new Response(
    JSON.stringify({ isAdmin: user?.role === "admin" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
