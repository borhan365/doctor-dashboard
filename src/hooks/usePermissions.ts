import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function usePermissions() {
  const { data: session } = useSession();

  const { data: permissions } = useQuery({
    queryKey: ["permissions", session?.user?.id],
    queryFn: async () => {
      const res = await fetch("/api/users/permissions/my");
      if (!res.ok) throw new Error("Failed to fetch permissions");
      return res.json();
    },
    enabled: !!session?.user?.id,
  });

  const hasPermission = (permission: string) => {
    if (!permissions) return false;
    return permissions.includes(permission);
  };

  const checkPermissions = (requiredPermissions: string[]) => {
    if (!permissions) return false;
    return requiredPermissions.every((permission) => hasPermission(permission));
  };

  return {
    permissions,
    hasPermission,
    checkPermissions,
  };
}
