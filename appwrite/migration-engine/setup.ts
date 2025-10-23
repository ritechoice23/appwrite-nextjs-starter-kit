import { tablesDB } from "@/appwrite/server";
import { appwriteConfig } from "@/appwrite/config";
import * as path from "path";
import { pathToFileURL } from "url";

/**
 * Run a setup file (create-db or create-migrations-table)
 */
export async function runSetupFile(filename: string, displayName: string): Promise<void> {
    try {
        const filePath = path.join(__dirname, `${filename}.ts`);
        const fileURL = pathToFileURL(filePath).href;
        const setupModule = await import(fileURL);
        if (typeof setupModule.up !== "function") {
            throw new Error(`${filename}.ts does not export an 'up' function`);
        }
        await setupModule.up();
        console.log(`✓ ${displayName} successfully`);
    } catch (error) {
        console.error(`✗ Failed to ${displayName.toLowerCase()}:`, error);
        throw error;
    }
}

/**
 * Ensure the database exists, create it if not
 */
export async function ensureDatabaseExists(): Promise<void> {
    try {
        await tablesDB.get({ databaseId: appwriteConfig.databaseId });
        console.log("✓ Database exists");
    } catch {
        console.log("Database not found, creating...");
        await runSetupFile("create-db", "Database created");
    }
}

/**
 * Ensure the migrations table exists, create it if not
 */
export async function ensureMigrationsTableExists(): Promise<void> {
    try {
        await tablesDB.getTable({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.migrationTableId
        });
        console.log("✓ Migrations table exists");
    } catch {
        console.log("Migrations table not found, creating...");
        await runSetupFile("create-migrations-table", "Migrations table created");
    }
}
