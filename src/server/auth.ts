import type { AstroCookies } from "astro";
import jwt from "jsonwebtoken";
import { createSession, getUser } from "@server/db";

const jwtSecret = import.meta.env.JWT_SECRET as jwt.Secret;

function verifyJwt(token: string): boolean {
  if (!token) {
    return false; // JWT cookie not in client cookie jar
  }

  jwt.verify(token, jwtSecret, (error: Error, _: any) => {
    if (error) {
      return false; // JWT cookie is corrupted
    }
  });

  return true;
}

function signJwt(tokenPayload: TokenPayload): string {
  return jwt.sign(tokenPayload, jwtSecret, {
    expiresIn: 60 * 60 * 24 * 7
  });
}

function decodeJwt(token: string): TokenPayload {
  return jwt.decode(token, jwtSecret);
}

export async function signIn(email: string, password: string): Promise<string | never> {

  // Authenticate user
  const user = await getUser(email, password);

  // Create session
  const session = await createSession(user.id);

  // Get session JWT
  const tokenPayload: TokenPayload = {
    userId: user.id,
    sessionId: session.id,
    expirationDate: session.expirationDate,
  }

  const token = signJwt(tokenPayload);
  return token;
}

export async function isSignedIn(cookies: AstroCookies): Promise<boolean | never> {
  if (!cookies || !cookies.has("token")) {
    return false; // JWT cookie was not there
  }

  const token = cookies.get("token")!.value;

  if (!verifyJwt(token)) {
    return false; // JWT cookie was malformed or empty
  }

  const tokenPayload = decodeJwt(token);

  if (new Date() >= tokenPayload.expirationDate) {
    return false; // JWT cookie is expired
  }

  return true;
}
