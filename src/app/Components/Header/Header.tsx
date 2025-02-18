"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isMobile?: boolean;
  darkMode?: boolean;
  toggleDarkMode?: (value: boolean) => void;
}

export function Header({
  sidebarOpen,
  setSidebarOpen,
  isMobile,
  darkMode,
  toggleDarkMode,
}: HeaderProps) {
  const { status } = useSession();
  const isLoading = status === "loading";

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm dark:bg-boxdark">
      <div className="flex h-18 items-center justify-between px-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cn(
              "inline-flex items-center justify-center rounded-sm p-1.5",
              "border border-slate-200 hover:bg-slate-100",
              "dark:border-slate-700 dark:hover:bg-slate-800",
              "transition-colors duration-200",
            )}
          >
            {sidebarOpen ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>

          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-slate-800 dark:text-white">
              Healtha<span className="text-blue-500">.</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-7">
          {toggleDarkMode && (
            <button
              onClick={() => toggleDarkMode(!darkMode)}
              className={cn(
                "rounded-full p-2",
                "hover:bg-slate-100 dark:hover:bg-slate-800",
                "transition-colors duration-200",
              )}
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-white" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          )}

          <div className="relative">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <span className="font-normal text-blue-600 dark:text-blue-400">
                  Dashboard
                </span>
              </Link>
              {!isLoading && status === "unauthenticated" && (
                <div className="flex items-center gap-2">
                  <Link
                    href="/auth/login"
                    className={cn(
                      "text-slate-600 hover:text-blue-500",
                      "dark:text-white dark:hover:text-blue-400",
                      "transition-colors duration-200",
                    )}
                  >
                    Sign In
                  </Link>
                </div>
              )}
              {status === "authenticated" && <ProfileDropdown />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
