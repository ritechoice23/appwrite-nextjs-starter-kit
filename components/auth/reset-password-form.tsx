"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authRoutes } from "@/routes/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordFormData } from "@/validations/auth-schema";
import { updatePassword } from "@/services/auth-service";
import { toast } from "sonner";
import InputError from "@/components/ui/input-error";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function ResetPasswordForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
    });

    useEffect(() => {
        if (!userId || !secret) {
            toast.error("Invalid password reset link");
            router.push(authRoutes.forgotPassword.path);
        }
    }, [userId, secret, router]);

    const onSubmit = handleSubmit(async (data) => {
        if (!userId || !secret) return;

        const result = await updatePassword(userId, secret, data.password).catch(() => null);

        if (result?.status) {
            toast.success("Password reset successfully! You can now log in.");
            router.push(authRoutes.login.path);
        } else {
            toast.error("Failed to reset password. The link may have expired.");
        }
    });

    if (!userId || !secret) {
        return null;
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>
                        Enter your new password below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="password">New Password</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter new password"
                                    {...register("password", { required: true })}
                                />
                                <InputError message={errors.password?.message} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm new password"
                                    {...register("confirmPassword", { required: true })}
                                />
                                <InputError message={errors.confirmPassword?.message} />
                            </Field>
                            <Field>
                                <Button loading={isSubmitting} type="submit">
                                    Reset Password
                                </Button>
                                <FieldDescription className="text-center">
                                    Remember your password? <Link href={authRoutes.login.path}>Log in</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
