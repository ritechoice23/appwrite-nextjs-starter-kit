import { appwriteConfig } from '@/appwrite/config';
import { Client, Account, ID } from "appwrite";

const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

const account = new Account(client);

export { client, account, ID };
