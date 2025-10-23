import { tablesDB } from "@/appwrite/server";
import { appwriteConfig } from "@/appwrite/config";
import { ID, Query } from "node-appwrite";
import type { Migration, MigrationRow } from "./types";

/**
 * Get all executed migrations from the database
 */
export async function getExecutedMigrations(): Promise<Migration[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.migrationTableId,
            queries: [Query.orderAsc("executedAt")],
        });

        return response.rows.map((row) => {
            const migrationRow = row as unknown as MigrationRow;
            return {
                $id: migrationRow.$id,
                filename: migrationRow.filename,
                executedAt: migrationRow.executedAt ? new Date(migrationRow.executedAt) : undefined,
                status: migrationRow.status as "success" | "failed",
            };
        });
    } catch (error) {
        console.error("Error fetching migrations table:", error);
        throw error;
    }
}

/**
 * Record a migration execution in the database
 */
export async function recordMigration(
    filename: string,
    status: "success" | "failed",
    error?: string,
    existingId?: string
): Promise<void> {
    try {
        if (existingId) {
            await tablesDB.updateRow({
                databaseId: appwriteConfig.databaseId,
                tableId: appwriteConfig.migrationTableId,
                rowId: existingId,
                data: {
                    executedAt: new Date().toISOString(),
                    status,
                    error: error || null,
                },
            });
            console.log(`✓ Updated migration record: ${filename} [${status}]`);
        } else {
            await tablesDB.createRow({
                databaseId: appwriteConfig.databaseId,
                tableId: appwriteConfig.migrationTableId,
                rowId: ID.unique(),
                data: {
                    filename,
                    executedAt: new Date().toISOString(),
                    status,
                    error: error || null,
                },
            });
            console.log(`✓ Recorded migration: ${filename} [${status}]`);
        }
    } catch (error) {
        console.error(`✗ Failed to record migration: ${filename}`, error);
        throw error;
    }
}
