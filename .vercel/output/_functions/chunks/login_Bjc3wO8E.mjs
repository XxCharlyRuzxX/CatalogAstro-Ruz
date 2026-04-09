import jwt from 'jsonwebtoken';

const SECRET = "£8*aVO3nL3Cb£33";
const POST = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const password = formData.get("password");
  const ADMIN_PASSWORD = "adminprueba2";
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { role: "admin" },
      SECRET,
      { expiresIn: "1d" }
    );
    cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24
    });
    return redirect("/");
  }
  return new Response("Contraseña incorrecta", { status: 401 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
