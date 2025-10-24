
"use client";
import { appRoutes } from "@/routes/app";
import { verifyEmail } from "@/services/auth-service";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { toast } from "sonner";

function VerifyEmailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const secret = searchParams.get('secret');
    const userId = searchParams.get('userId');

    useEffect(() => {
        const handleVerifyEmail = async (userId: string, secret: string) => {
            try {
                await verifyEmail(userId, secret);
                toast.success("Email verified successfully!");

                setTimeout(() => {
                    router.push(appRoutes.home.path);
                }, 2000);
            } catch (error) {
                console.error("Email verification failed:", error);
                toast.error("Email verification failed. Please try again.");
            }
        };

        if (userId && secret) {
            handleVerifyEmail(userId, secret);
        } else {
            toast.error("Invalid verification link");
            router.push(appRoutes.home.path);
        }
    }, [userId, secret, router]);

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-bold">Email Verification</h1>
                <p className="mt-2">Verifying your email...</p>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <h1 className="text-2xl font-bold">Email Verification</h1>
                    <p className="mt-2">Loading...</p>
                </div>
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    );
}
