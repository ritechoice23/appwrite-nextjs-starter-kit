"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UpdateNameForm } from "./update-name-form";
import { UpdateEmailForm } from "./update-email-form";
import { UpdatePasswordForm } from "./update-password-form";
import { LogoutButton } from "@/components/auth";
import { Models } from "appwrite";
import { useRouter } from "next/navigation";

interface AccountSettingsProps {
    user: Models.User<Models.Preferences>;
}

export function AccountSettings({ user }: AccountSettingsProps) {
    const router = useRouter();

    const handleSuccess = () => {
        router.refresh();
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Account</h1>
                <p className="text-muted-foreground">
                    Manage your account settings.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <UpdateNameForm user={user} onSuccess={handleSuccess} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Email</CardTitle>
                    <CardDescription>
                        Manage your accounts email address.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdateEmailForm user={user} onSuccess={handleSuccess} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                        Modify your current password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdatePasswordForm onSuccess={handleSuccess} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Account security</CardTitle>
                    <CardDescription>
                        Manage your account security
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Log out</p>
                            <p className="text-sm text-muted-foreground">
                                Log out from this device
                            </p>
                        </div>
                        <LogoutButton variant="outline" />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Log out all devices</p>
                            <p className="text-sm text-muted-foreground">
                                Log out from all devices where you&apos;re signed in
                            </p>
                        </div>
                        <LogoutButton variant="outline" showDropdown />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
