"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Home } from "lucide-react";
import { appRoutes } from "@/routes/app";
import { authRoutes } from "@/routes/auth";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogoutButton } from "../auth";

const navigation = [
    { name: "Home", href: appRoutes.home.path, icon: Home, badge: undefined as string | undefined },
];

export function TopNavbar() {
    const { user } = useAuth();
    const pathname = usePathname();

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
            <div className="container max-w-screen-2xl px-4 flex h-14 items-center">
                <div className="mr-6 flex items-center space-x-2">
                    <Link href={appRoutes.home.path} className="flex items-center space-x-2 transition-opacity hover:opacity-80">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/80 text-primary-foreground font-bold shadow-sm">
                            R
                        </div>
                        <span className="font-semibold text-lg hidden sm:inline-block">ritechoice23</span>
                    </Link>
                </div>

                <nav className="flex items-center space-x-1 text-sm font-medium flex-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 rounded-md transition-colors relative",
                                    isActive
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                <span className="hidden sm:inline-block">{item.name}</span>
                                {item.badge && (
                                    <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                                        {item.badge}
                                    </span>
                                )}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                        {user ? getInitials(user.name) : "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user?.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href={authRoutes.accountSettings.path}>Account Settings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <LogoutButton variant="ghost" className="w-full justify-start" />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
