export interface Migration {
    $id?: string;
    filename: string;
    executedAt?: Date;
    status: "success" | "failed";
}

export interface MigrationRow {
    $id: string;
    filename: string;
    executedAt: string;
    status: string;
    error?: string | null;
}
