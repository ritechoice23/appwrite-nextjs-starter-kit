"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { authRoutes } from "@/routes/auth"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import InputError from "@/components/ui/input-error"
import { CreateAccountFormData, createAccountSchema } from "@/validations/auth-schema"
import { createAccount, loginWithOAuth } from "@/services/auth-service"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { OAuthProvider } from "appwrite"
import { useState } from "react"

export function SignUpForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const { isLoading: authLoading } = useAuth({ middleware: "guest" });
    const [isOAuthLoading, setIsOAuthLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateAccountFormData>({
        resolver: zodResolver(createAccountSchema),
    })

    const onSubmit = handleSubmit(async (data: CreateAccountFormData) => {
        const response = await createAccount(data)
        if (!response.status) {
            toast("Account creation failed.")
            return
        }
        toast.success("Account created successfully!")
        setTimeout(() => {
            redirect(authRoutes.login.path)
        }, 2000);
    })

    const handleGoogleSignup = async () => {
        setIsOAuthLoading(true);
        await loginWithOAuth(OAuthProvider.Google);
    }

    if (authLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Sign up</CardTitle>
                    <CardDescription>
                        Enter your details below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    {...register("name", { required: true })}
                                />

                                <InputError message={errors.name?.message} />
                            </Field>

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
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Link
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input id="password" type="password" {...register("password", { required: true })} />

                                <InputError message={errors.password?.message} />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Confirm Password</FieldLabel>
                                </div>
                                <Input id="confirmPassword" type="password" {...register("confirmPassword", { required: true })} />
                                <InputError message={errors.confirmPassword?.message} />
                            </Field>
                            <Field>
                                <Button loading={isSubmitting} type="submit">Sign Up</Button>
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={handleGoogleSignup}
                                    loading={isOAuthLoading}
                                >
                                    Sign Up with Google
                                </Button>
                                <FieldDescription className="text-center">
                                    Already have an account? <Link href={authRoutes.login.path}>Log in</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
