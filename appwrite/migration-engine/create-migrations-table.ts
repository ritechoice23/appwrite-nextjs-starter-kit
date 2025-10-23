import { tablesDB } from "@/appwrite/server";
import { appwriteConfig } from "@/appwrite/config";

export async function up() {
    const table = await tablesDB.createTable({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.migrationTableId,
        name: appwriteConfig.migrationTableId,
        enabled: true,
    });

    console.log("Table created, now creating columns...");

    await tablesDB.createStringColumn({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.migrationTableId,
        key: "filename",
        size: 255,
        required: true,
    });

    await tablesDB.createStringColumn({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.migrationTableId,
        key: "status",
        size: 50,
        required: true,
    });

    await tablesDB.createDatetimeColumn({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.migrationTableId,
        key: "executedAt",
        required: true,
    });

    await tablesDB.createStringColumn({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.migrationTableId,
        key: "error",
        size: 1000,
        required: false,
    });

    console.log("All columns created successfully!");

    return table;
}

// Only run if this file is executed directly
if (require.main === module) {
    up().then((response) => {
        console.log("Migrations table setup completed:", response);
    }).catch((error) => {
        console.error("Error creating migrations table:", error);
    });
}
