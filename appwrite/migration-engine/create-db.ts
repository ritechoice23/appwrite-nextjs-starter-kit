import { tablesDB } from "@/appwrite/server";
import { appwriteConfig } from "@/appwrite/config";

export async function up() {
    return await tablesDB.create({
        databaseId: appwriteConfig.databaseId,
        name: appwriteConfig.databaseName,
        enabled: true,
    });
}

// Only run if this file is executed directly
if (require.main === module) {
    up().then((response) => {
        console.log("Database created successfully:", response);
    }).catch((error) => {
        console.error("Error creating database:", error);
    });
}
