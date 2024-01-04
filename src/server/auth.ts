import type { AstroCookies } from "astro";
import jwt from "jsonwebtoken";
import { createSession, getKeeper, getUser } from "@server/db";

const jwtSecret = import.meta.env.JWT_SECRET as jwt.Secret;

export function verifyJwt(token: string): boolean {
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

export function signJwt(tokenPayload: TokenPayload): string {
  return jwt.sign(tokenPayload, jwtSecret, {
    expiresIn: 60 * 60 * 24 * 7
  });
}

export function decodeJwt(token: string): TokenPayload {
  return jwt.decode(token, jwtSecret);
}

export async function signIn(email: string, password: string): Promise<string | never> {

  // Authenticate user
  const user = await getUser(email, password);

  // Get keeper
  const keeper = await getKeeper(user.id);

  // Create session
  const session = await createSession(user.id);

  // Get session JWT
  const tokenPayload: TokenPayload = {
    userId: user.id,
    keeperId: keeper.id,
    sessionId: session.id,
    expirationDate: session.expirationDate,
  }

  const token = signJwt(tokenPayload);

  console.log("JWT was successfully generated:")
  console.log(token)

  return token;
}

export function isSignedIn(cookies: AstroCookies): boolean {
  if (!cookies || !cookies.has("token")) {
    console.log("JWT cookie was not there.")
    return false;
  }

  const token = cookies.get("token")!.value;

  if (!verifyJwt(token)) {
    console.log("JWT cookie was malformed or empty.")
    return false;
  }

  const tokenPayload = decodeJwt(token);

  console.log("in isSignedIn, checking payload")
  console.dir(tokenPayload)

  if (new Date() >= tokenPayload.expirationDate) {
    console.log("JWT cookie is expired.")
    return false;
  }

  return true;
}
