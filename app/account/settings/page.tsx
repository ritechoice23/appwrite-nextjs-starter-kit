"use client";

import { useAuth } from "@/hooks/use-auth";
import { AccountSettings } from "@/components/account";
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";

export default function AccountSettingsPage() {
    const { user, isLoading } = useAuth({ middleware: "auth" });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>Loading...</div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <AuthenticatedLayout>
            <div className="container max-w-4xl py-8">
                <AccountSettings user={user} />
            </div>
        </AuthenticatedLayout>
    );
}
