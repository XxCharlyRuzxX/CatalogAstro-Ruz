import { defineMiddleware } from "astro/middleware";
import { verifyToken } from "./utils/auth";

export const onRequest = defineMiddleware(async ({ url, cookies }, next) => {
  if (url.pathname.startsWith("/admin")) {
    const token = cookies.get("token")?.value;
    const user = verifyToken(token);

    const isValid = user?.role === "admin";

    if (!isValid) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/login-admin",
        },
      });
    }
  }

  return next();
});
