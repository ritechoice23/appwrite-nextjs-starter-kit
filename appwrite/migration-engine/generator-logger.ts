/**
 * Validate migration name format
 */
export function validateMigrationName(name: string): void {
    if (!name) {
        throw new Error("Please provide a migration name");
    }

    if (!/^[a-z0-9-_]+$/.test(name)) {
        throw new Error("Migration name can only contain lowercase letters, numbers, hyphens, and underscores");
    }
}

/**
 * Print success message
 */
export function printSuccess(fileName: string, filePath: string): void {
    console.log("✅ Migration created successfully!");
    console.log(`📄 File: ${fileName}`);
    console.log(`📁 Path: ${filePath}`);
    console.log("");
    console.log("Next steps:");
    console.log(`1. Edit the migration file: appwrite/migrations/${fileName}`);
    console.log("2. Implement your database changes in the up() function");
    console.log("3. Run the migration: npm run db:migrate");
}

/**
 * Print error message
 */
export function printError(message: string): void {
    console.error(`❌ Error: ${message}`);
}

/**
 * Print usage instructions
 */
export function printUsage(): void {
    console.log("Usage: npm run db:make-migration <migration-name>");
    console.log("Example: npm run db:make-migration create-users-table");
}
