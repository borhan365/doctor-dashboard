"use client";

import { useSessionStore } from "@/store/sessionStore";
import { Role, Status, User } from "@/types/auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useInitializeSession = () => {
  const { data: session, status } = useSession();
  const { setUser, setLoading, clearSession } = useSessionStore();

  useEffect(() => {
    try {
      if (status === "loading") {
        setLoading(true);
        return;
      }

      if (status === "authenticated" && session?.user) {
        const user: User = {
          id: session.user.id,
          name: session.user.name ?? null,
          email: session.user.email ?? "",
          image: session.user.image ?? null,
          role: (session.user.role as Role) ?? Role.USER,
          status: (session.user.status as Status) ?? Status.PENDING,
          isVerified: session.user.isVerified ?? false,
        };
        setUser(user);
      } else {
        clearSession();
      }
    } catch (error) {
      console.error("Error initializing session:", error);
      clearSession();
    } finally {
      setLoading(false);
    }
  }, [session, status, setUser, setLoading, clearSession]);
};
