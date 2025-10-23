import * as path from "path";
import { pathToFileURL } from "url";
import { recordMigration } from "./recorder";

/**
 * Execute a single migration file
 */
export async function executeMigration(filename: string, existingMigrationId?: string): Promise<void> {
    const migrationsDir = path.join(__dirname, '..', 'migrations');
    const migrationPath = path.join(migrationsDir, filename);
    const migrationURL = pathToFileURL(migrationPath).href;

    try {
        console.log(`Running migration: ${filename}`);

        const migration = await import(migrationURL);

        if (typeof migration.up !== "function") {
            throw new Error(`Migration file ${filename} does not export an 'up' function`);
        }

        await migration.up();
        await recordMigration(filename, "success", undefined, existingMigrationId);
        console.log(`✓ Migration completed: ${filename}`);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`✗ Migration failed: ${filename}`, error);
        await recordMigration(filename, "failed", errorMessage, existingMigrationId);
        throw error;
    }
}
