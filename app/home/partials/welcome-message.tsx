"use client";
import VerifyEmailForm from '@/components/auth/send-email-verification';
import { useAuth } from '@/hooks/use-auth';

function WelcomeMessage() {
    const { user, isLoading } = useAuth({ middleware: "auth" });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>Loading...</div>
            </div>
        );
    }

    const hasVerifiedEmail = user?.emailVerification;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Home Page</h1>
            </div>

            {!hasVerifiedEmail && (
                <div className="mb-6">
                    <VerifyEmailForm />
                </div>
            )}

            <div>
                <p className="text-lg mb-2">Welcome to the Home Page!</p>
                <div className="mt-4 font-bold text-2xl">
                    {user?.name}
                </div>
                <p className="text-muted-foreground mt-2">
                    {user?.email}
                </p>
            </div>
        </div>
    );
}

export default WelcomeMessage;