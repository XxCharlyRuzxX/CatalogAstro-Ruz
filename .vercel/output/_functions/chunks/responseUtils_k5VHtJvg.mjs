import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const globalForPrisma = globalThis;
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está definida");
}
const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL
});
const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter,
  log: ["warn", "error"]
});
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

function success(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
function error(e, message = "Ocurrió un error", status = 500) {
  const finalMessage = e instanceof Error ? e.message : String(e);
  return new Response(JSON.stringify({ error: `${message}: ${finalMessage}` }), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

export { error as e, prisma as p, success as s };
