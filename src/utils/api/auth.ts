import { API_ROUTES } from "@/config/api";
import { useSessionStore } from "@/store/sessionStore";
import { LoginCredentials, RegisterCredentials } from "@/types/auth";

class AuthAPI {
  async login(credentials: LoginCredentials) {
    const response = await fetch(API_ROUTES.AUTH.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  }

  async register(data: RegisterCredentials) {
    const response = await fetch(API_ROUTES.AUTH.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return response.json();
  }

  async logout() {
    try {
      const response = await fetch(API_ROUTES.AUTH.LOGOUT, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Clear session store regardless of API response
      const sessionStore = useSessionStore.getState();
      await sessionStore.clearSession();

      return response.json();
    } catch (error) {
      // Ensure session is cleared even if API call fails
      const sessionStore = useSessionStore.getState();
      await sessionStore.clearSession();
      throw error;
    }
  }

  async checkSession() {
    try {
      const response = await fetch(API_ROUTES.AUTH.SESSION, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        // If session check fails, clear the session
        const sessionStore = useSessionStore.getState();
        await sessionStore.logout();
        throw new Error("Session check failed");
      }

      return response.json();
    } catch (error) {
      // On any error, ensure session is cleared
      const sessionStore = useSessionStore.getState();
      await sessionStore.logout();
      throw error;
    }
  }
}

export const authApi = new AuthAPI();
