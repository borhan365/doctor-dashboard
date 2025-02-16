// Sidebar.tsx
"use client";

import { cn } from "@/lib/utils";
import {
  Bookmark,
  Calendar,
  DollarSign,
  File,
  FileText,
  MessageSquare,
  Newspaper,
  Pill,
  Settings,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  isMobile: boolean;
  darkMode: boolean;
}

const ProfileSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  isMobile,
  darkMode,
}: SidebarProps) => {
  const pathname = usePathname();

  // Helper function to check if a path is active
  const isPathActive = (path: string) => {
    // Exact match for dashboard
    if (path === "/profile") {
      return pathname === "/profile";
    }

    // For other routes, check if pathname starts with the path
    const pathSegments = pathname.split("/");
    const linkSegments = path.split("/");

    // Check if the base paths match up to the length of the link
    for (let i = 0; i < linkSegments.length; i++) {
      if (pathSegments[i] !== linkSegments[i]) {
        return false;
      }
    }
    return true;
  };

  const doctorMenuItems = [
    { label: "Dashboard", link: "/profile", icon: MdDashboard },
    {
      label: "Appointments",
      link: "/doctor/appointments",
      icon: Calendar,
    },
    { label: "Patients", link: "/doctor/patients", icon: Users },
    {
      label: "Invoices",
      link: "/doctor/invoices",
      icon: File,
    },
    {
      label: "Prescriptions",
      link: "/doctor/prescriptions",
      icon: FileText,
    },
    // For the doctor management menus
    { label: "Medicines", link: "/doctor/medicines", icon: Pill },
    {
      label: "Diagnostics",
      link: "/doctor/diagnostics",
      icon: Stethoscope,
    },
    {
      label: "Messages",
      link: "/doctor/messages",
      icon: MessageSquare,
    },
    {
      label: "Manage Chambers",
      link: "/doctor/available-slots",
      icon: Calendar,
    },
    { label: "Accounts", link: "/doctor/accounts", icon: DollarSign },
    { label: "Reviews", link: "/doctor/reviews", icon: Star },
  ];

  const menuItems = [
    { label: "Bookmarks", link: "/bookmarks", icon: Bookmark },
    { label: "My Articles", link: "/articles", icon: Newspaper },
    { label: "Settings", link: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen overflow-hidden border-r border-slate-200 dark:border-slate-800",
          "flex flex-col transition-transform duration-300 ease-in-out",
          darkMode ? "bg-slate-900" : "bg-white",
          isMobile
            ? `w-72 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`
            : `${sidebarOpen ? "w-72" : "w-20"}`,
          "overflow-y-auto",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar content */}
          <nav className="mt-5 px-4 py-4 !pt-0 lg:mt-9 lg:px-6">
            {/* Logo */}
            <div className="mb-6 ml-4 flex items-center justify-start border-b border-slate-100 pb-4 dark:border-slate-800">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-slate-800 dark:text-white">
                  Healtha<span className="text-blue-500">.</span>
                </span>
              </Link>
            </div>
            {/* Doctor Menu */}
            <div>
              {sidebarOpen && (
                <h3
                  className={cn(
                    "mb-4 ml-4 text-sm font-semibold uppercase tracking-wider",
                    darkMode ? "text-slate-200" : "text-slate-600",
                  )}
                >
                  Doctor
                </h3>
              )}

              <ul
                className={cn(
                  "flex flex-col gap-1",
                  sidebarOpen
                    ? "items-stretch"
                    : "flex items-center justify-center gap-2",
                )}
              >
                {doctorMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isPathActive(item.link);

                  return (
                    <li
                      key={item.label}
                      className={`w-full ${sidebarOpen ? "items-stretch" : "flex items-center justify-center gap-2"}`}
                    >
                      <Link
                        href={item.link}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-4 py-3 font-medium",
                          "transition-colors duration-300 ease-in-out",
                          isActive
                            ? darkMode
                              ? "bg-blue-600 text-white"
                              : "bg-blue-50 text-blue-600"
                            : darkMode
                              ? "text-slate-200 hover:bg-slate-800"
                              : "text-slate-600 hover:bg-slate-50",
                        )}
                        onClick={() => isMobile && setSidebarOpen(false)}
                      >
                        <span className="min-w-[24px]">
                          <Icon
                            size={20}
                            className={isActive ? "text-current" : ""}
                          />
                        </span>
                        {sidebarOpen && <span>{item.label}</span>}
                        {!sidebarOpen && (
                          <div
                            className={cn(
                              "absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2",
                              "whitespace-nowrap rounded-md bg-slate-900 px-2 py-1",
                              "text-xs text-white opacity-0 group-hover:opacity-100",
                              "transition-opacity duration-300",
                            )}
                          >
                            {item.label}
                          </div>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* General Menu */}
            <div className="mt-8">
              {sidebarOpen && (
                <h3
                  className={cn(
                    "mb-4 ml-4 text-sm font-semibold uppercase tracking-wider",
                    darkMode ? "text-slate-200" : "text-slate-600",
                  )}
                >
                  Others
                </h3>
              )}

              <ul
                className={cn(
                  "flex flex-col gap-2",
                  sidebarOpen
                    ? "items-stretch"
                    : "flex items-center justify-center gap-2",
                )}
              >
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isPathActive(item.link);

                  return (
                    <li
                      key={item.label}
                      className={`w-full ${sidebarOpen ? "items-stretch" : "flex items-center justify-center gap-2"}`}
                    >
                      <Link
                        href={item.link}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-4 py-3 font-medium",
                          "transition-colors duration-300 ease-in-out",
                          isActive
                            ? darkMode
                              ? "bg-blue-600 text-white"
                              : "bg-blue-50 text-blue-600"
                            : darkMode
                              ? "text-slate-200 hover:bg-slate-800"
                              : "text-slate-600 hover:bg-slate-50",
                        )}
                        onClick={() => isMobile && setSidebarOpen(false)}
                      >
                        <span className="min-w-[24px]">
                          <Icon
                            size={20}
                            className={isActive ? "text-current" : ""}
                          />
                        </span>
                        {sidebarOpen && <span>{item.label}</span>}
                        {!sidebarOpen && (
                          <div
                            className={cn(
                              "absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2",
                              "whitespace-nowrap rounded-md bg-slate-900 px-2 py-1",
                              "text-xs text-white opacity-0 group-hover:opacity-100",
                              "transition-opacity duration-300",
                            )}
                          >
                            {item.label}
                          </div>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default ProfileSidebar;
