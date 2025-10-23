"use client";

import { Button } from "@/components/ui/button";
import { logout, logoutAllSessions } from "@/services/auth-service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authRoutes } from "@/routes/auth";
import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LogoutButtonProps {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    showDropdown?: boolean;
    className?: string;
}

export function LogoutButton({ variant = "outline", showDropdown = false, className }: LogoutButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { clearUser } = useAuthStore();
    const router = useRouter();

    const handleLogout = async (allSessions: boolean = false) => {
        setIsLoading(true);

        const result = allSessions
            ? await logoutAllSessions().catch(() => null)
            : await logout().catch(() => null);

        if (result?.status) {
            clearUser();
            toast.success(allSessions ? "Logged out from all devices" : "Logged out successfully");
            router.push(authRoutes.login.path);
            router.refresh();
        } else {
            toast.error("Failed to logout");
        }

        setIsLoading(false);
    };

    if (showDropdown) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={variant} disabled={isLoading}>
                        {isLoading ? "Logging out..." : "Logout"}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Logout Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleLogout(false)}>
                        Logout this device
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLogout(true)}>
                        Logout all devices
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <Button
            variant={variant}
            onClick={() => handleLogout()}
            loading={isLoading}
            className={className}
        >
            Logout
        </Button>
    );
}
