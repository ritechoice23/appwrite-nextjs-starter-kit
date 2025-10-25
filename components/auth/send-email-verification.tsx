"use client";

import { useAuth } from '@/hooks/use-auth';
import { createEmailVerification } from '@/services/auth-service';
import { toast } from 'sonner';
import { useCallback } from 'react';
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

    if (!user) return null;

    return (
        <div>
            <h2>Verify Your Email</h2>
            <p>
                Please check your inbox at {user.email} for a verification email. Click the link in the email to verify your email address.
            </p>
            <Button onClick={handleResendVerification}>
                Resend Verification Email
            </Button>
        </div>
    );
}