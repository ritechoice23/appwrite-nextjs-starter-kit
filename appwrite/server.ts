import { appwriteConfig } from '@/appwrite/config';
import { Account, Client, TablesDB } from 'node-appwrite';

const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.apiKey);

const tablesDB = new TablesDB(client);

const account = new Account(client);


export { tablesDB, account };

