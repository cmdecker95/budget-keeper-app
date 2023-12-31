import { Client, Databases, Account, ID } from "appwrite";


export const appwriteConfig = {
  APPWRITE_ENDPOINT: import.meta.env.APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID: import.meta.env.APPWRITE_PROJECT_ID
}


const client = new Client()
  .setEndpoint(appwriteConfig.APPWRITE_ENDPOINT)
  .setProject(appwriteConfig.APPWRITE_PROJECT_ID);


export const db = new Databases(client);
export const account = new Account(client);
