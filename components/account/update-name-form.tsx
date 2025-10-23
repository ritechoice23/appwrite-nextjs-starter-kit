"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateNameSchema, UpdateNameFormData } from "@/validations/auth-schema";
import { updateName } from "@/services/auth-service";
import { toast } from "sonner";
import InputError from "@/components/ui/input-error";
import { Models } from "appwrite";

interface UpdateNameFormProps {
    user: Models.User<Models.Preferences>;
    onSuccess?: () => void;
}

export function UpdateNameForm({ user, onSuccess }: UpdateNameFormProps) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateNameFormData>({
        resolver: zodResolver(updateNameSchema),
        defaultValues: {
            name: user.name || "",
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        const result = await updateName(data.name);

        if (result.status) {
            toast.success("Name updated successfully");
            onSuccess?.();
        } else {
            toast.error("Failed to update name");
        }
    });

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <Field>
                <FieldLabel htmlFor="name">Full name</FieldLabel>
                <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    {...register("name")}
                />
                <InputError message={errors.name?.message} />
            </Field>

            <Button loading={isSubmitting} type="submit">
                Update name
            </Button>
        </form>
    );
}
