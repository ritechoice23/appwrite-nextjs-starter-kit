/**
 * Print a summary of migration execution
 */
export function printSummary(successful: number, failed: number, pending: number): void {
    console.log("\n" + "=".repeat(50));
    console.log("Migration Summary:");
    console.log(`  Successful: ${successful}`);
    console.log(`  Failed: ${failed}`);
    console.log(`  Pending: ${pending}`);
    console.log("=".repeat(50) + "\n");
}
