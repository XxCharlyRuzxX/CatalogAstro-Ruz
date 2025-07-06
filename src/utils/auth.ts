import jwt, { type JwtPayload } from "jsonwebtoken";

const SECRET = import.meta.env.JWT_SECRET;

interface AdminPayload extends JwtPayload {
  role: string;
}

export function verifyToken(token?: string): AdminPayload | null {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, SECRET);
    if (typeof decoded === "object" && "role" in decoded) {
      return decoded as AdminPayload;
    }
    return null;
  } catch (err) {
    console.error("Token verification error:", err);
    return null;
  }
}
