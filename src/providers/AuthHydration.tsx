"use client";

import { useAuth } from "@/store/useAuth";
import { useEffect, useState } from "react";

export function AuthHydration({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const { user, doctor } = useAuth();

  useEffect(() => {
    // Check if we have data in localStorage with correct key
    const stored = localStorage.getItem("doctorSession");
    if (stored && !user) {
      try {
        const { user: storedUser, doctor: storedDoctor } = JSON.parse(stored);
        if (storedUser && storedDoctor) {
          // Rehydrate the store with the correct data structure
          useAuth.setState({
            user: storedUser,
            doctor: storedDoctor,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error("Error hydrating auth state:", error);
      }
    }
    setIsHydrated(true);
  }, [user]);

  if (!isHydrated) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}
