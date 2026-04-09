import { v as verifyToken } from './auth_CYJIo9BF.mjs';

const GET = async ({ cookies }) => {
  const token = cookies.get("token")?.value;
  const user = verifyToken(token);
  return new Response(
    JSON.stringify({ isAdmin: user?.role === "admin" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
