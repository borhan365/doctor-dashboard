"use client";

import { useLogout } from "@/app/hooks/useLogout";

export const LogoutButton = () => {
  const { logout } = useLogout();

  return (
    <button
      onClick={logout}
      className="text-slate-600 transition-colors hover:text-slate-900"
      type="button"
    >
      Logout
    </button>
  );
};
