// Sidebar.tsx
"use client";

import { cn } from "@/lib/utils";
import {
  BookOpen,
  Briefcase,
  Calendar,
  DollarSign,
  FileText,
  MessageSquare,
  NotebookText,
  Package,
  Pill,
  Rocket,
  Route,
  Settings,
  Stethoscope,
  Trophy,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  isMobile: boolean;
}

const DashboardSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  isMobile,
}: SidebarProps) => {
  const pathname = usePathname();

  // Helper function to check if a path is active
  const isPathActive = (path: string) => {
    // Exact match for dashboard
    if (path === "/dashboard") {
      return pathname === "/dashboard";
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
    { label: "Dashboard", link: "/dashboard", icon: MdDashboard },
    {
      label: "Appointments",
      link: "/dashboard/appointments",
      icon: Calendar,
    },
    { label: "Patients", link: "/dashboard/patients", icon: Users },
    {
      label: "Invoices",
      link: "/dashboard/invoices",
      icon: DollarSign,
    },
    {
      label: "Prescriptions",
      link: "/dashboard/prescriptions",
      icon: FileText,
    },
    // For the doctor management menus
    { label: "Medicines", link: "/dashboard/medicines", icon: Pill },
    {
      label: "Diagnostics",
      link: "/dashboard/diagnostics",
      icon: Stethoscope,
    },
    {
      label: "Reports",
      link: "/dashboard/reports",
      icon: FileText,
    },

    {
      label: "Messages",
      link: "/dashboard/messages",
      icon: MessageSquare,
    },
    { label: "Accounts", link: "/dashboard/accounts", icon: DollarSign },
  ];

  const profileMenuItems = [
    { label: "Profile", link: "/dashboard/profile", icon: User },
    { label: "Chambers", link: "/dashboard/chambers", icon: Calendar },
  ];

  const menuItems = [
    // { label: "Reviews", link: "/doctor/reviews", icon: Star },
    // { label: "Bookmarks", link: "/doctor/bookmarks", icon: Bookmark },
    // { label: "My Articles", link: "/doctor/articles", icon: Newspaper },
    { label: "Subscriptions", link: "/dashboard/subscriptions", icon: Package },
    {
      label: "SMS Settings",
      link: "/dashboard/sms-settings",
      icon: MessageSquare,
    },
    { label: "Assistants", link: "/dashboard/assistants", icon: Users },
    { label: "Settings", link: "/dashboard/settings", icon: Settings },
    { label: "Billings", link: "/dashboard/billings", icon: DollarSign },
  ];

  // don't show sidebar in doctor profile page
  const createDoctorRoute = pathname?.startsWith("/dashboard/new-doctor");

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
          "fixed left-0 top-0 z-50 h-screen overflow-hidden border-r border-slate-200 dark:border-slate-700",
          "flex flex-col transition-transform duration-300 ease-in-out",
          "bg-white dark:bg-slate-900",
          isMobile
            ? `w-72 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`
            : `${sidebarOpen ? "w-72" : "w-20"}`,
          "overflow-y-auto",
        )}
      >
        <div className="flex h-full flex-col">
          <nav className="relative mt-3 px-4 py-4 !pt-0 lg:mt-9 lg:px-6">
            {/* Doctor Menu */}
            <div>
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
                      className={`w-full ${
                        sidebarOpen
                          ? "items-stretch"
                          : "flex items-center justify-center gap-2"
                      }`}
                    >
                      <Link
                        href={item.link}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-4 py-3 font-medium",
                          "transition-colors duration-300 ease-in-out",
                          isActive
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                            : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50",
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
                              "whitespace-nowrap rounded-md bg-slate-800 px-2 py-1",
                              "text-xs text-white dark:bg-slate-700 dark:text-slate-200",
                              "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
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

            {/* Profile Menu */}
            {!createDoctorRoute && (
              <div className="mt-8">
                {sidebarOpen && (
                  <h3
                    className={cn(
                      "mb-4 ml-4 text-xs font-semibold uppercase tracking-wider",
                      "text-slate-400",
                    )}
                  >
                    Profile Settings
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
                  {profileMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isPathActive(item.link);

                    return (
                      <li
                        key={item.label}
                        className={`w-full ${
                          sidebarOpen
                            ? "items-stretch"
                            : "flex items-center justify-center gap-2"
                        }`}
                      >
                        <Link
                          href={item.link}
                          className={cn(
                            "group relative flex items-center gap-3 rounded-lg px-4 py-3 font-medium",
                            "transition-colors duration-300 ease-in-out",
                            isActive
                              ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                              : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50",
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
                                "whitespace-nowrap rounded-md bg-slate-800 px-2 py-1",
                                "text-xs text-white dark:bg-slate-700 dark:text-slate-200",
                                "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
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
            )}

            {/* General Menu */}
            <div className="mt-8">
              {sidebarOpen && (
                <h3
                  className={cn(
                    "mb-4 ml-4 text-xs font-semibold uppercase tracking-wider",
                    "text-slate-400",
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
                      className={`w-full ${
                        sidebarOpen
                          ? "items-stretch"
                          : "flex items-center justify-center gap-2"
                      }`}
                    >
                      <Link
                        href={item.link}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-4 py-3 font-medium",
                          "transition-colors duration-300 ease-in-out",
                          isActive
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                            : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50",
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
                              "whitespace-nowrap rounded-md bg-slate-800 px-2 py-1",
                              "text-xs text-white dark:bg-slate-700 dark:text-slate-200",
                              "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
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

            {/* Promotion Button */}
            <div className="w-full">
              <Link
                href="/dashboard/ads"
                className="mt-4 flex w-full items-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-white transition-colors duration-300 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                <Rocket className="h-5 w-5" />
                <span className="text-base font-medium">Advertise With Us</span>
              </Link>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
