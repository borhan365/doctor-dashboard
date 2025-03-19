"use client";

import { useLogout } from "@/hooks/useLogout";

export default function LogoutPage() {
  const { logout } = useLogout();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-slate-200 bg-white p-8 shadow-md">
        <h1 className="text-center text-2xl font-bold text-slate-900">
          Sign Out
        </h1>
        <p className="text-center text-slate-600">
          Are you sure you want to sign out?
        </p>
        <button
          onClick={logout}
          className="w-full rounded-md bg-red-700 px-4 py-2 text-center font-medium text-white hover:bg-red-800 "
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
