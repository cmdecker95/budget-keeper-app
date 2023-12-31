import { Client, Databases, Account, AppwriteException } from "appwrite";


export const appwriteConfig = {
  APPWRITE_ENDPOINT: import.meta.env.APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID: import.meta.env.APPWRITE_PROJECT_ID
}


const client = new Client()
  .setEndpoint(appwriteConfig.APPWRITE_ENDPOINT)
  .setProject(appwriteConfig.APPWRITE_PROJECT_ID);


export const db = new Databases(client);
export const account = new Account(client);


export async function signin(email: string, password: string) {
  try {
    const response = await account.createEmailSession(email, password);
    console.dir(`Session created: ${response}`)
  } catch (e) {
    console.error(e)
  }

}
