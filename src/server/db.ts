import { getXataClient, type UserRecord, type SessionRecord } from "@server/xata";

const xata = getXataClient();

export async function getUser(email: string, password: string): Promise<UserRecord | never> {
  const user = await xata.db.user.filter("email", email).getFirstOrThrow();

  if (password !== user.password) {
    throw Error("Invalid password");
  }

  return user;
}

export async function createSession(userId: string): Promise<SessionRecord | never> {
  const session = await xata.db.session.create({
    userId,
    expirationDate: new Date(new Date().setDate(new Date().getDate() + 7)),
  });

  return session;
}
