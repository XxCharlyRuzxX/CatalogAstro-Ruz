import jwt from 'jsonwebtoken';

const SECRET = "£8*aVO3nL3Cb£33";
function verifyToken(token) {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, SECRET);
    if (typeof decoded === "object" && "role" in decoded) {
      return decoded;
    }
    return null;
  } catch (err) {
    console.error("Token verification error:", err);
    return null;
  }
}

export { verifyToken as v };
