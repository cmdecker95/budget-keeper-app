import { type APIRoute } from "astro";
import { response } from "@server/utils";
import { signIn } from "@server/auth";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {

    // Authenticate user
    const { email, password } = await request.json() as UserCredentials;

    // Create session and generate JWT
    const token = await signIn(email, password);

    cookies.set("token", token, {
      expires: new Date(new Date().setDate(new Date().getDate() + 7)),
      httpOnly: true,
      path: "/"
    });

  } catch (error) {
    return response(401, { error: "Unauthorized" })
  }

  return response(200, { data: { success: true } })
}
