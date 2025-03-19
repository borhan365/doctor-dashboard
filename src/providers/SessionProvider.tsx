"use client";

import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";

interface SessionContextType {
  isAuthenticated: boolean;
  user: any | null;
  hospital: any | null;
  logout: () => void;
}

const SessionContext = createContext<SessionContextType>({
  isAuthenticated: false,
  user: null,
  hospital: null,
  logout: () => {},
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, hospital, logout } = useAuth();

  // Initialize auth state from Zustand store
  const sessionValue: SessionContextType = {
    isAuthenticated: !!user,
    user,
    hospital,
    logout: async () => {
      await logout();
      router.push("/auth/login");
    },
  };

  return (
    <SessionContext.Provider value={sessionValue}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
