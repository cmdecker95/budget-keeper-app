import { type APIRoute } from "astro";
import { respond } from "@server/utils";

export const POST: APIRoute = async ({ request }) => {
  let email;
  let password;

  try {
    const data = await request.json();

    email = data.email;
    password = data.password;

  } catch (error) {
    return respond(400, { error: "Invalid request. Confirm your request body is in valid JSON format." })
  }


  return respond(200, { data: "OK" })
}
