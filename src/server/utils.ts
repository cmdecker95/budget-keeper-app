export function response(status: number, body: object): Response {
  return new Response(JSON.stringify(body), { status });
}
