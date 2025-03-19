import { ApiUrl } from "@/app/Variables";
import {
  AuthResponse,
  Doctor,
  LoginCredentials,
  RegisterData,
  User,
} from "@/types/auth.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  doctor: Doctor | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isVerified: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  checkVerification: () => boolean;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      doctor: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      isVerified: false,

      login: async (credentials) => {
        try {
          set({ isLoading: true, error: null });
          const response = await fetch(`${ApiUrl}/doctors/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
            credentials: "include",
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Login failed");
          }

          const data: AuthResponse = await response.json();

          if (data.status === "success" && data.data) {
            set({
              user: data.data.user,
              doctor: data.data.doctor,
              isLoading: false,
              isAuthenticated: true,
              isVerified: data.data.user.isVerified || false,
            });
            return;
          }

          throw new Error("Login failed");
        } catch (error: any) {
          set({ error: error.message || "Login failed", isLoading: false });
          throw error;
        }
      },

      register: async (data) => {
        try {
          set({ isLoading: true, error: null });
          const response = await fetch(`${ApiUrl}/doctors/user/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Registration failed");
          }

          const authData: AuthResponse = await response.json();
          if (authData.status === "success" && authData.data) {
            set({
              user: authData.data.user,
              doctor: authData.data.doctor,
              isLoading: false,
              isAuthenticated: false, // Not authenticated until email verification
              isVerified: false, // Not verified on registration
            });
            return;
          }

          throw new Error("Registration failed");
        } catch (error: any) {
          set({
            error: error.message || "Registration failed",
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          const response = await fetch(`${ApiUrl}/doctors/user/logout`, {
            method: "POST",
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Logout failed");
          }

          // Clear the store
          set({
            user: null,
            doctor: null,
            isAuthenticated: false,
            isVerified: false,
            isLoading: false,
          });

          // Clear cookies if needed
          document.cookie =
            "doctor-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie =
            "doctor-authenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } catch (error) {
          console.error("Logout error:", error);
          set({ isLoading: false });
        }
      },

      checkAuth: async () => {
        // Check if we have a user in the store
        if (get().user) {
          return true;
        }

        // Check if we have the auth cookie
        const hasAuthCookie = document.cookie.includes(
          "doctor-authenticated=true",
        );

        if (hasAuthCookie) {
          set({ isAuthenticated: true });
          return true;
        }

        return false;
      },

      checkVerification: () => {
        return get().isVerified || get().user?.isVerified || false;
      },
    }),
    {
      name: "doctorSession",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        doctor: state.doctor,
        isAuthenticated: state.isAuthenticated,
        isVerified: state.isVerified,
      }),
    },
  ),
);
