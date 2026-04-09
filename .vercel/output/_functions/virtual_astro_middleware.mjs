import 'es-module-lexer';
import { af as defineMiddleware, ao as sequence } from './chunks/sequence_iKDpAx54.mjs';
import 'piccolore';
import 'clsx';
import { v as verifyToken } from './chunks/auth_CYJIo9BF.mjs';

const onRequest$1 = defineMiddleware(async ({ url, cookies }, next) => {
  if (url.pathname.startsWith("/admin")) {
    const token = cookies.get("token")?.value;
    const user = verifyToken(token);
    const isValid = user?.role === "admin";
    if (!isValid) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/login-admin"
        }
      });
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
