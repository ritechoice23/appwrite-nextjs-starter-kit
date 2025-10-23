"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordSchema, UpdatePasswordFormData } from "@/validations/auth-schema";
import { updateUserPassword } from "@/services/auth-service";
import { toast } from "sonner";
import InputError from "@/components/ui/input-error";

interface UpdatePasswordFormProps {
    onSuccess?: () => void;
}

export function UpdatePasswordForm({ onSuccess }: UpdatePasswordFormProps) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UpdatePasswordFormData>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            oldPassword: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        const result = await updateUserPassword(data.password, data.oldPassword);

        if (result.status) {
            toast.success("Password updated successfully");
            reset();
            onSuccess?.();
        } else {
            toast.error("Failed to update password. Check your current password.");
        }
    });

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <Field>
                <FieldLabel htmlFor="oldPassword">Current password</FieldLabel>
                <Input
                    id="oldPassword"
                    type="password"
                    placeholder="Enter current password"
                    {...register("oldPassword")}
                />
                <InputError message={errors.oldPassword?.message} />
            </Field>

            <Field>
                <FieldLabel htmlFor="password">New password</FieldLabel>
                <Input
                    id="password"
                    type="password"
                    placeholder="Enter new password"
                    {...register("password")}
                />
                <InputError message={errors.password?.message} />
            </Field>

            <Field>
                <FieldLabel htmlFor="confirmPassword">Confirm new password</FieldLabel>
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    {...register("confirmPassword")}
                />
                <InputError message={errors.confirmPassword?.message} />
            </Field>

            <Button loading={isSubmitting} type="submit">
                Update password
            </Button>
        </form>
    );
}
