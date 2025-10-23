import "dotenv/config";
import { ensureDatabaseExists, ensureMigrationsTableExists } from "./setup";
import { getMigrationFiles } from "./file-utils";
import { getExecutedMigrations } from "./recorder";
import { executeMigration } from "./executor";
import { printSummary } from "./logger";

/**
 * Run all pending migrations
 */
export async function runMigrations(): Promise<void> {
    console.log("Starting migration process...\n");

    try {
        console.log("=== Setup Phase ===");
        await ensureDatabaseExists();
        await ensureMigrationsTableExists();
        console.log("=== Setup Complete ===\n");

        const migrationFiles = getMigrationFiles();
        console.log(`Found ${migrationFiles.length} migration file(s)\n`);

        if (migrationFiles.length === 0) {
            console.log("No migrations to run");
            return;
        }

        // Get executed migrations
        const executedMigrations = await getExecutedMigrations();
        const migrationMap = new Map(executedMigrations.map((m) => [m.filename, m]));

        const successfulMigrations = executedMigrations.filter(m => m.status === "success");
        const failedMigrations = executedMigrations.filter(m => m.status === "failed");

        console.log(`${successfulMigrations.length} migration(s) completed successfully`);
        if (failedMigrations.length > 0) {
            console.log(`${failedMigrations.length} migration(s) previously failed and will be retried\n`);
        } else {
            console.log("");
        }

        // Find pending migrations
        const pendingMigrations = migrationFiles.filter((filename) => {
            const migration = migrationMap.get(filename);
            return !migration || migration.status === "failed";
        });

        if (pendingMigrations.length === 0) {
            console.log("✓ All migrations are up to date!");
            return;
        }

        console.log(`Found ${pendingMigrations.length} pending migration(s):\n`);
        pendingMigrations.forEach((filename) => {
            const migration = migrationMap.get(filename);
            if (migration?.status === "failed") {
                console.log(`  - ${filename} (retrying after previous failure)`);
            } else {
                console.log(`  - ${filename}`);
            }
        });
        console.log("");

        // Execute pending migrations
        let successCount = 0;
        let failCount = 0;

        for (const filename of pendingMigrations) {
            const existingMigration = migrationMap.get(filename);
            try {
                await executeMigration(filename, existingMigration?.$id);
                successCount++;
            } catch {
                failCount++;
                console.error(`\nStopping migration process due to error in: ${filename}\n`);
                break;
            }
        }

        const pendingCount = pendingMigrations.length - successCount - failCount;
        printSummary(successCount, failCount, pendingCount);

        if (failCount > 0) {
            throw new Error("Migration process completed with errors");
        }

        console.log("✓ All migrations completed successfully!");
    } catch (error) {
        console.error("\n✗ Migration process failed:", error);
        throw error;
    }
}

// Run migrations if this file is executed directly
if (require.main === module) {
    runMigrations()
        .then(() => {
            console.log("\nMigration script finished");
            process.exit(0);
        })
        .catch((error) => {
            console.error("\nMigration script failed:", error);
            process.exit(1);
        });
}
