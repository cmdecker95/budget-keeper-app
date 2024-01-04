import { getXataClient, type KeeperRecord, type SessionRecord, type BudgetRecord, type UserRecord } from "@server/xata";

const xata = getXataClient();

export async function getUser(email: string, password: string): Promise<UserRecord | never> {
  const user = await xata.db.user.filter("email", email).getFirstOrThrow();

  if (password !== user.password) {
    throw Error("Invalid password");
  }

  console.log("User successfully returned from Xata:")
  console.dir(user)

  return user;
}

export async function getKeeper(userId: string): Promise<KeeperRecord | never> {
  const keeper = await xata.db.keeper.filter("userId", userId).getFirstOrThrow();

  return keeper;
}

export async function createSession(userId: string): Promise<SessionRecord | never> {
  const session = await xata.db.session.create({
    userId,
    expirationDate: new Date(new Date().setDate(new Date().getDate() + 7)),
  });

  console.log("Session successfully returned from Xata:")
  console.dir(session)

  return session;
}
