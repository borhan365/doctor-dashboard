import { ApiUrl } from "@/app/Variables";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await fetch(`${ApiUrl}/doctors/user/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Clear any local state/storage if needed
      router.push("/auth/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  return { logout };
};
