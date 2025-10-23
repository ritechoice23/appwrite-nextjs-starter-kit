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
import { forgotPasswordSchema, ForgotPasswordFormData } from "@/validations/auth-schema";
import { createPasswordRecovery } from "@/services/auth-service";
import { toast } from "sonner";
import InputError from "@/components/ui/input-error";
import { useState } from "react";

export function ForgotPasswordForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [emailSent, setEmailSent] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState("");

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        const result = await createPasswordRecovery(data.email).catch(() => null);

        if (result?.status) {
            toast.success("Recovery email sent! Check your inbox.");
            setSubmittedEmail(data.email);
            setEmailSent(true);
        } else {
            toast.error("Failed to send recovery email. Please try again.");
        }
    });

    if (emailSent) {
        return (
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card>
                    <CardHeader>
                        <CardTitle>Check Your Email</CardTitle>
                        <CardDescription>
                            We&apos;ve sent a password recovery link to {submittedEmail}.
                            Please check your inbox and follow the instructions to reset your password.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            variant="outline"
                            onClick={() => setEmailSent(false)}
                            className="w-full"
                        >
                            Send Another Email
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Forgot Password?</CardTitle>
                    <CardDescription>
                        Enter your email address and we&apos;ll send you a link to reset your password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    {...register("email", { required: true })}
                                />
                                <InputError message={errors.email?.message} />
                            </Field>
                            <Field>
                                <Button loading={isSubmitting} type="submit">
                                    Send Recovery Email
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
