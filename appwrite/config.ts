export const appwriteConfig = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
    projectName: process.env.NEXT_APPWRITE_PROJECT_NAME as string,
    apiKey: process.env.NEXT_APPWRITE_API_KEY as string,
    databaseId: process.env.NEXT_APPWRITE_DATABASE_ID as string,
    databaseName: process.env.NEXT_APPWRITE_DATABASE_NAME as string,
    migrationTableId: "migrations",
    migrationSetupFiles: ["create-db", "create-migrations-table"],
};

export const tableNames = {
    test_table: "tests_table",
};