import { z } from 'zod';

export const createAccountSchema = z.object({
    name: z.string().min(5, { message: 'Name must be at least 5 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Confirm Password must be at least 8 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type CreateAccountFormData = z.infer<typeof createAccountSchema>;


export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Confirm Password must be at least 8 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const updateNameSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(128, { message: 'Name must be at most 128 characters' }),
});

export type UpdateNameFormData = z.infer<typeof updateNameSchema>;

export const updateEmailSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

export type UpdateEmailFormData = z.infer<typeof updateEmailSchema>;

export const updatePasswordSchema = z.object({
    oldPassword: z.string().min(8, { message: 'Current password must be at least 8 characters' }),
    password: z.string().min(8, { message: 'New password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Confirm Password must be at least 8 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;