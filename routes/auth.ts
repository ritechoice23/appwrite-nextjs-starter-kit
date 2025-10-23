export const authRoutes = {
    signup: {
        path: "/auth/signup",
        label: "Sign Up"
    },
    login: {
        path: "/auth/login",
        label: "Log In"
    },
    verifyEmail: {
        path: "/auth/verify-email",
        label: "Verify Email"
    },
    forgotPassword: {
        path: "/auth/forgot-password",
        label: "Forgot Password"
    },
    resetPassword: {
        path: "/auth/reset-password",
        label: "Reset Password"
    },
    accountSettings: {
        path: "/account/settings",
        label: "Account Settings"
    },
    oauthCallback: {
        path: "/auth/oauth/callback",
        label: "OAuth Callback"
    }
}