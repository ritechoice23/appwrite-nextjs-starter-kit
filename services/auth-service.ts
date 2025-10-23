import { CreateAccountFormData, LoginFormData } from "@/validations/auth-schema";
import { account, ID } from "@/appwrite/client";
import { authRoutes } from "@/routes/auth";
import { OAuthProvider } from "appwrite";

export async function createAccount(data: CreateAccountFormData) {

    const user = await account.create({
        userId: ID.unique(),
        email: data.email,
        name: data.name,
        password: data.password
    });

    return {
        status: true,
        'message': 'Account created successfully',
        'data': user
    }
}

export async function login(data: LoginFormData) {

    const session = await account.createEmailPasswordSession({
        email: data.email,
        password: data.password
    }).catch((e) => {
        console.log(e);
        return null;
    });

    if (!session) {
        return {
            status: false,
            message: 'Login failed',
            data: null
        }
    }

    return {
        status: true,
        message: 'Login successful',
        data: session
    }
}


export async function currentUser() {
    const user = await account.get().catch(() => null);

    if (!user) {
        return {
            status: false,
            message: 'No user logged in',
            data: null
        }
    }

    return {
        status: true,
        message: 'User fetched successfully',
        data: user
    }
}


export async function createEmailVerification() {
    const verifyLink = `${window.location.origin}${authRoutes.verifyEmail.path}`;
    await account.createVerification({
        url: verifyLink
    }).catch((e) => {
        console.log(e);
        return {
            status: false,
            message: 'Email verification failed',
            data: null
        };
    });

    return {
        status: true,
        message: 'Email verification sent successfully',
        data: null
    };
}


export async function verifyEmail(userId: string, secret: string) {
    await account.updateVerification(userId, secret).catch(() => {
        return {
            status: false,
            message: 'Email verification failed',
            data: null
        };
    });
    return {
        status: true,
        message: 'Email verified successfully',
        data: null
    };
}

export async function createPasswordRecovery(email: string) {
    const recoveryLink = `${window.location.origin}${authRoutes.resetPassword.path}`;

    await account.createRecovery({
        email,
        url: recoveryLink
    }).catch((e) => {
        console.log(e);
        return {
            status: false,
            message: 'Failed to send recovery email',
            data: null
        };
    });

    return {
        status: true,
        message: 'Recovery email sent successfully',
        data: null
    };
}

export async function updatePassword(userId: string, secret: string, password: string) {
    await account.updateRecovery({
        userId,
        secret,
        password
    }).catch((e) => {
        console.log(e);
        return {
            status: false,
            message: 'Failed to reset password',
            data: null
        };
    });

    return {
        status: true,
        message: 'Password reset successfully',
        data: null
    };
}

export async function logout(sessionId: string = "current") {
    await account.deleteSession(sessionId).catch(() => {
        return {
            status: false,
            message: 'Failed to logout',
            data: null
        };
    });

    return {
        status: true,
        message: 'Logged out successfully',
        data: null
    };
}

export async function logoutAllSessions() {
    await account.deleteSessions().catch(() => {
        return {
            status: false,
            message: 'Failed to logout from all sessions',
            data: null
        };
    });

    return {
        status: true,
        message: 'Logged out from all sessions successfully',
        data: null
    };
}

export async function updateName(name: string) {
    const user = await account.updateName({ name }).catch(() => {
        return null;
    });

    if (!user) {
        return {
            status: false,
            message: 'Failed to update name',
            data: null
        };
    }

    return {
        status: true,
        message: 'Name updated successfully',
        data: user
    };
}

export async function updateEmail(email: string, password: string) {
    const user = await account.updateEmail({ email, password }).catch((e) => {
        return null;
    });

    if (!user) {
        return {
            status: false,
            message: 'Failed to update email',
            data: null
        };
    }

    return {
        status: true,
        message: 'Email updated successfully',
        data: user
    };
}

export async function updateUserPassword(password: string, oldPassword?: string) {
    const user = await account.updatePassword({ password, oldPassword }).catch((e) => {
        return null;
    });

    if (!user) {
        return {
            status: false,
            message: 'Failed to update password',
            data: null
        };
    }

    return {
        status: true,
        message: 'Password updated successfully',
        data: user
    };
}

export async function loginWithOAuth(provider: OAuthProvider) {
    const successUrl = `${window.location.origin}${authRoutes.oauthCallback.path}`;
    const failureUrl = `${window.location.origin}${authRoutes.login.path}?error=oauth_failed`;

    try {
        account.createOAuth2Token({
            provider,
            success: successUrl,
            failure: failureUrl,
        });
    } catch (e) {
        return {
            status: false,
            message: 'OAuth login failed',
            data: null
        };
    }
}

export async function createSessionFromOAuth(userId: string, secret: string) {
    try {
        const session = await account.createSession(userId, secret);
        return {
            status: true,
            message: 'Session created successfully',
            data: session
        };
    } catch (e) {
        return {
            status: false,
            message: 'Failed to create session',
            data: null
        };
    }
}