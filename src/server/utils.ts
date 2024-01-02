export function response(status: number, body: object): Response {
  console.log("Responding with code", status);
  console.dir(body)

  return new Response(JSON.stringify(body), { status });
}
