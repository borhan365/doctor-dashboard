import { useSessionStore } from "@/store/slices/sessionSlice";
import { LoginCredentials } from "@/types/auth";
import { authApi } from "@/utils/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { setSession, clearSession } = useSessionStore();
  const router = useRouter();

  // Check session status
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      try {
        const response = await authApi.checkSession();
        if (response.user) {
          setSession(response.user);
          return response;
        }
        return null;
      } catch (error) {
        clearSession();
        return null;
      }
    },
  });

  // Login mutation
  const login = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await authApi.login(credentials);
      setSession(response.user);
      return response;
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  // Logout mutation
  const logout = useMutation({
    mutationFn: async () => {
      await authApi.logout();
      clearSession();
      router.push("/login");
    },
  });

  return {
    session,
    login,
    logout,
  };
};
