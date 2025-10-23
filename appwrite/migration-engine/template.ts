/**
 * Migration file template generator
 */
export function generateMigrationTemplate(migrationName: string): string {
    return `/**
 * Migration: ${migrationName}
 * Created: ${new Date().toISOString()}
 */

import { tablesDB } from "@/appwrite/server";
import { appwriteConfig } from "@/appwrite/config";
import { ID } from "node-appwrite";
import { Permission } from "node-appwrite";

export async function up() {
    // Create a table
    // await tablesDB.createTable({
    //     databaseId: appwriteConfig.databaseId,
    //     tableId: ID.unique(),
    //     name: "users",
    //     permissions: [Permission.read("any")],
    //     enabled: true,
    // });
    
    // Add a column
    // await tablesDB.createStringColumn({
    //     databaseId: appwriteConfig.databaseId,
    //     tableId: "<TABLE_ID>",
    //     key: "name",
    //     required: true,
    //     size: 255,
    // });
    
    console.log("✓ Migration '${migrationName}' executed successfully");
}

// Only run if this file is executed directly
if (require.main === module) {
    up().then(() => {
        console.log("Migration completed");
        process.exit(0);
    }).catch((error) => {
        console.error("Migration failed:", error);
        process.exit(1);
    });
}
`;
}
