

"use client";
import { appRoutes } from "@/routes/app";
import { verifyEmail } from "@/services/auth-service";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Page() {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get('secret');
    const userId = urlParams.get('userId');

    useEffect(() => {
        const handleVerifyEmail = async (userId: string, secret: string) => {
            try {
                await verifyEmail(userId, secret);
            } catch (error) {
                console.error("Email verification failed:", error);
            }
        };

        if (userId && secret) {
            handleVerifyEmail(userId, secret);
        }

        toast.success("Email verified successfully!");

        setTimeout(() => {
            redirect(appRoutes.home.path);
        }, 2000);

    }, [userId, secret]);

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-bold">Email Verification</h1>
                <p className="mt-2">Verifying your email...</p>
            </div>
        </div>
    )
}
