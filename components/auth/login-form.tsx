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
import { LoginFormData, loginSchema } from "@/validations/auth-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { login, loginWithOAuth } from "@/services/auth-service"
import { toast } from "sonner"
import InputError from "@/components/ui/input-error"
import { redirect } from "next/navigation"
import { appRoutes } from "@/routes/app"
import { useAuth } from "@/hooks/use-auth"
import { OAuthProvider } from "appwrite"
import { useState } from "react"
import { useAuthStore } from "@/store/auth-store"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { isLoading: authLoading } = useAuth({ middleware: "guest" });
    const { fetchUser } = useAuthStore();
    const [isOAuthLoading, setIsOAuthLoading] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = handleSubmit(async (data) => {
        const response = await login(data)
        if (!response.status) {
            toast.error("Login failed, email or password is incorrect.")
            return
        }
        toast.success("Logged in successfully!")
        await fetchUser();
        setTimeout(() => {
            redirect(appRoutes.home.path)
        }, 2000);
    })

    const handleGoogleLogin = async () => {
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
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
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
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Link
                                        href={authRoutes.forgotPassword.path}
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input id="password" type="password" {...register("password", { required: true })} />
                                <InputError message={errors.password?.message} />
                            </Field>
                            <Field>
                                <Button loading={isSubmitting} type="submit">Login</Button>
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    loading={isOAuthLoading}
                                >
                                    Login with Google
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <Link href={authRoutes.signup.path}>Sign up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div >
    )
}
