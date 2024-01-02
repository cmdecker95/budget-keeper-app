import { type APIRoute } from "astro";
import { response } from "@server/utils";
import { signIn } from "@server/auth";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  try {

    // Authenticate user
    const { email, password } = await request.json() as UserCredentials;

    // Create session and generate JWT
    const token = await signIn(email, password);
    cookies.set("token", token);

  } catch (error) {
    return response(401, { error: "Unauthorized" })
  }

  return response(200, { data: { success: true } })
}
