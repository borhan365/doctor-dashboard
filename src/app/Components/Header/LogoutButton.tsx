"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-slate-100 hover:text-slate-900"
    >
      <LogOut className="h-4 w-4" />
      <span>Sign Out</span>
    </button>
  );
};

export default LogoutButton;
