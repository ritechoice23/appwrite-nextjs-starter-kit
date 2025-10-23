"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authRoutes } from "@/routes/auth";
import { appRoutes } from "@/routes/app";
import { useAuthStore } from "@/store/auth-store";

interface UseAuthOptions {
    middleware?: "auth" | "guest";
    redirectTo?: string;
}

export function useAuth(options?: UseAuthOptions) {
    const { user, isLoading, isAuthenticated, fetchUser, hasInitialized } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!hasInitialized) {
            fetchUser();
        }
    }, [hasInitialized, fetchUser]);

    useEffect(() => {
        if (!hasInitialized || isLoading || !options?.middleware) return;

        if (options.middleware === "auth" && !user) {
            const redirectPath = options.redirectTo || authRoutes.login.path;
            router.push(redirectPath);
        }

        if (options.middleware === "guest" && user) {
            const redirectPath = options.redirectTo || appRoutes.home.path;
            router.push(redirectPath);
        }
    }, [user, isLoading, hasInitialized, options?.middleware, options?.redirectTo, router]);

    return {
        user,
        isAuthenticated,
        isLoading: isLoading || !hasInitialized,
        refetchUser: fetchUser,
    };
}