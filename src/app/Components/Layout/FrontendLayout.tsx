// FrontendLayout.tsx
"use client";

import Header from "@/app/Components/Header/page";
import Sidebar from "@/app/Components/Sidebar/page";
import { AuthUser } from "@/types/auth";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const { data: sessionData, status } = useSession();
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (sessionData?.user) {
      setUser(sessionData.user as AuthUser);
    } else if (status === "unauthenticated") {
      setUser(null);
    }
  }, [sessionData, status]);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setDesktopSidebarOpen(!desktopSidebarOpen);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform overflow-y-auto bg-white transition-all duration-300 ease-in-out dark:bg-boxdark lg:static lg:translate-x-0 ${
          isMobile
            ? sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : desktopSidebarOpen
              ? "lg:block"
              : "lg:hidden"
        }`}
      >
        <Sidebar
          sidebarOpen={isMobile ? sidebarOpen : desktopSidebarOpen}
          setSidebarOpen={isMobile ? setSidebarOpen : setDesktopSidebarOpen}
          isMobile={isMobile}
          darkMode={darkMode}
        />
      </div>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          sidebarOpen={isMobile ? sidebarOpen : desktopSidebarOpen}
          setSidebarOpen={toggleSidebar}
          isMobile={isMobile}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <main className="relative flex-1 overflow-y-auto bg-slate-50 transition-all duration-300 dark:bg-boxdark-2">
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
}
