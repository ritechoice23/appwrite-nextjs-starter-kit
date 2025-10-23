"use client";

import { useAuth } from "@/hooks/use-auth";
import { ReactNode } from "react";
import { Models } from "appwrite";

interface ProtectProps {
    fallback?: ReactNode;
    condition?: (user: Models.User<Models.Preferences> | null) => boolean;
    children: ReactNode;
}

export function Protect({ fallback, condition, children }: ProtectProps) {
    const { user, isAuthenticated, isLoading } = useAuth({ middleware: "auth" });

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return <>{fallback}</>;
    }

    if (condition && !condition(user)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
