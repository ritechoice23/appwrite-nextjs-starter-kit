"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createSessionFromOAuth } from "@/services/auth-service";
import { appRoutes } from "@/routes/app";
import { authRoutes } from "@/routes/auth";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";

export default function OAuthCallbackPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { fetchUser } = useAuthStore();

    useEffect(() => {
        const handleCallback = async () => {
            const userId = searchParams.get("userId");
            const secret = searchParams.get("secret");

            if (!userId || !secret) {
                toast.error("Invalid OAuth callback parameters");
                router.push(authRoutes.login.path);
                return;
            }

            const result = await createSessionFromOAuth(userId, secret);

            if (result.status) {
                await fetchUser();
                toast.success("Logged in successfully with OAuth!");
                router.push(appRoutes.home.path);
            } else {
                toast.error("Failed to complete OAuth login");
                router.push(authRoutes.login.path);
            }
        };

        handleCallback();
    }, [searchParams, router, fetchUser]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Completing login...</p>
            </div>
        </div>
    );
}
