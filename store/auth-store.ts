import { create } from "zustand";
import { Models } from "appwrite";
import { currentUser } from "@/services/auth-service";

interface AuthState {
    user: Models.User<Models.Preferences> | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    hasInitialized: boolean;
    fetchUser: () => Promise<void>;
    setUser: (user: Models.User<Models.Preferences> | null) => void;
    clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    hasInitialized: false,

    fetchUser: async () => {
        // Don't fetch if already loading or already has user
        const state = get();
        if (state.isLoading || (state.hasInitialized && state.user)) {
            return;
        }

        set({ isLoading: true });

        const result = await currentUser();
        const userData = result.status && result.data ? result.data : null;

        set({
            user: userData,
            isAuthenticated: userData !== null,
            isLoading: false,
            hasInitialized: true,
        });
    },

    setUser: (user) => {
        set({
            user,
            isAuthenticated: user !== null,
            hasInitialized: true,
        });
    },

    clearUser: () => {
        set({
            user: null,
            isAuthenticated: false,
            hasInitialized: true,
        });
    },
}));
