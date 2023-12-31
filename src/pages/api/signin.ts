import { type APIRoute } from "astro";
import { signin } from "@server/appwrite";
import { respond } from "@server/utils";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const { email, password } = await request.json();

    const response = await signin(email, password);

    // TODO: Parse response
    console.dir(`Response from signin in api/signin: ${response}`)

    return respond(200, { data: { message: "Well done!" } })

  }

  return respond(400, { error: { message: "Expected JSON..." } })

}
