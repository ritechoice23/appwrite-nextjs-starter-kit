"use client";

import { ResetPasswordForm } from "@/components/auth";
import { Suspense } from "react";

function ResetPasswordContent() {
    return <ResetPasswordForm />;
}

export default function ResetPasswordPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Suspense fallback={<div>Loading...</div>}>
                    <ResetPasswordContent />
                </Suspense>
            </div>
        </div>
    );
}
