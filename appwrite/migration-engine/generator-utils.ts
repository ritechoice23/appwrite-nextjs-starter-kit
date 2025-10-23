import * as fs from "fs";
import * as path from "path";

/**
 * Get the next migration number based on existing files
 */
export function getNextMigrationNumber(migrationsDir: string): number {
    if (!fs.existsSync(migrationsDir)) {
        return 1;
    }

    const existingFiles = fs.readdirSync(migrationsDir)
        .filter(file => file.endsWith('.ts'))
        .filter(file => /^\d+-/.test(file));

    if (existingFiles.length === 0) {
        return 1;
    }

    const numbers = existingFiles.map(file => {
        const match = file.match(/^(\d+)-/);
        return match ? parseInt(match[1], 10) : 0;
    });

    return Math.max(...numbers) + 1;
}

/**
 * Create the migration file
 */
export function createMigrationFile(
    migrationsDir: string,
    fileName: string,
    content: string
): void {
    const filePath = path.join(migrationsDir, fileName);

    if (fs.existsSync(filePath)) {
        throw new Error(`Migration file '${fileName}' already exists`);
    }

    if (!fs.existsSync(migrationsDir)) {
        fs.mkdirSync(migrationsDir, { recursive: true });
    }

    fs.writeFileSync(filePath, content, 'utf8');
}
