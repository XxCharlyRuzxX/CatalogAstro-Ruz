export function success<T>(data: T, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function created<T>(data: T): Response {
  return success(data, 201);
}

export function notFound(message = 'No encontrado'): Response {
  return new Response(JSON.stringify({ error: message }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function error(e: unknown, message = 'Ocurrió un error', status = 500): Response {
  const finalMessage = e instanceof Error ? e.message : String(e);
  return new Response(JSON.stringify({ error: `${message}: ${finalMessage}` }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
