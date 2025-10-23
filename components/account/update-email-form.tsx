"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateEmailSchema, UpdateEmailFormData } from "@/validations/auth-schema";
import { updateEmail } from "@/services/auth-service";
import { toast } from "sonner";
import InputError from "@/components/ui/input-error";
import { Models } from "appwrite";

interface UpdateEmailFormProps {
    user: Models.User<Models.Preferences>;
    onSuccess?: () => void;
}

export function UpdateEmailForm({ user, onSuccess }: UpdateEmailFormProps) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateEmailFormData>({
        resolver: zodResolver(updateEmailSchema),
        defaultValues: {
            email: user.email || "",
            password: "",
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        const result = await updateEmail(data.email, data.password);

        if (result.status) {
            toast.success("Email updated successfully");
            onSuccess?.();
        } else {
            toast.error("Failed to update email. Check your password.");
        }
    });

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    {...register("email")}
                />
                <InputError message={errors.email?.message} />
            </Field>

            <Field>
                <FieldLabel htmlFor="password">Current password</FieldLabel>
                <Input
                    id="password"
                    type="password"
                    placeholder="Enter your current password"
                    {...register("password")}
                />
                <InputError message={errors.password?.message} />
            </Field>

            <Button loading={isSubmitting} type="submit">
                Update email
            </Button>
        </form>
    );
}
