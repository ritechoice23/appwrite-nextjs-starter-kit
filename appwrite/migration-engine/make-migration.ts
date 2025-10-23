#!/usr/bin/env node
import * as path from "path";
import { validateMigrationName, printError, printUsage, printSuccess } from "./generator-logger";
import { getNextMigrationNumber, createMigrationFile } from "./generator-utils";
import { generateMigrationTemplate } from "./template";

/**
 * Main function to create a new migration
 */
function main(): void {
    const migrationName = process.argv[2];

    try {
        validateMigrationName(migrationName);

        const migrationsDir = path.join(__dirname, '..', 'migrations');
        const migrationNumber = getNextMigrationNumber(migrationsDir);
        const fileName = `${migrationNumber}-${migrationName}.ts`;
        const filePath = path.join(migrationsDir, fileName);

        const template = generateMigrationTemplate(migrationName);
        createMigrationFile(migrationsDir, fileName, template);

        printSuccess(fileName, filePath);
    } catch (error) {
        printError(error instanceof Error ? error.message : String(error));
        printUsage();
        process.exit(1);
    }
}

main();
