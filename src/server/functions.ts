export function respond(status: number, body: object) {
  return new Response(JSON.stringify(body), { status });
}
