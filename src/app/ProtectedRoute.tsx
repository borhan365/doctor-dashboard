"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/app/Components/Loading/page";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // If we have a session, mark as authenticated
    if (session?.user) {
      setIsAuthenticated(true);
    } else if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [session, status, router]);

  // Show loading state while checking authentication
  if (status === "loading" || !isAuthenticated) {
    return <Loading />;
  }
  // Render children only when authenticated
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;

