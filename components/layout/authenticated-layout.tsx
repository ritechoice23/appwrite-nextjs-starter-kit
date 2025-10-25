import { TopNavbar } from "./top-navbar";

interface AuthenticatedLayoutProps {
    children: React.ReactNode;
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <TopNavbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </main>
        </div>
    );
}
