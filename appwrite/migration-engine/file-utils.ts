import * as fs from "fs";
import * as path from "path";
import { appwriteConfig } from "@/appwrite/config";

/**
 * Check if a file is a setup file (not a migration)
 */
function isSetupFile(filename: string): boolean {
    const baseName = filename.replace(/\.(ts|js)$/, "");
    return appwriteConfig.migrationSetupFiles.includes(baseName) ||
        filename === "index.ts" ||
        filename === "index.js";
}

/**
 * Get all migration files from the migrations folder
 */
export function getMigrationFiles(): string[] {
    const migrationsDir = path.join(__dirname, '..', 'migrations');

    if (!fs.existsSync(migrationsDir)) {
        return [];
    }

    const files = fs.readdirSync(migrationsDir);
    return files
        .filter(file => {
            const isValidExtension = file.endsWith(".ts") || file.endsWith(".js");
            return isValidExtension && !isSetupFile(file);
        })
        .sort();
}
