"use client";

import { useAuth } from '@/hooks/use-auth';
import { createEmailVerification } from '@/services/auth-service';
import { toast } from 'sonner';
import { useEffect, useCallback } from 'react';
import { authRoutes } from '@/routes/auth';
import { Button } from '../ui/button';

export default function VerifyEmailForm() {
    const { user } = useAuth();

    const handleResendVerification = useCallback(async () => {
        const result = await createEmailVerification().catch(() => null);

        if (result) {
            toast.success("Verification email sent successfully!");
        } else {
            toast.error("Failed to send verification email.");
        }
    }, []);

    useEffect(() => {
        if (user && !user.emailVerification) {
            handleResendVerification();
        }
    }, [user]);

    if (!user) return null;

    return (
        <div>
            <h2>Verify Your Email</h2>
            <p>
                A verification email has been sent to {user.email}. Please check your inbox and follow the instructions to verify your email address.
            </p>
            <Button onClick={handleResendVerification}>
                Resend Verification Email
            </Button>
        </div>
    );
}