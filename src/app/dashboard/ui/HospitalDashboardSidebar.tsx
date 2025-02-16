// Sidebar.tsx
"use client";

import { cn } from "@/lib/utils";
import {
  BookOpen,
  Briefcase,
  Building,
  Calendar,
  DollarSign,
  Images,
  Layers,
  MapPin,
  Microscope,
  Settings,
  ShieldPlus,
  Star,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";

import hospitalLogo from "/public/images/logo/hospital.webp";
import Image from "next/image";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  isMobile: boolean;
  darkMode: boolean;
  hospitalLogo: string;
}

const HospitalDashboardSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  isMobile,
  darkMode,
}: SidebarProps) => {
  const pathname = usePathname();

  // Helper function to check if a path is active
  const isPathActive = (path: string) => {
    // Exact match for dashboard
    if (path === "/hospital") {
      return pathname === "/hospital";
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

  const hospitalMenuItems = [
    { label: "Dashboard", link: "/hospital", icon: MdDashboard },
    { label: "Branches", link: "/hospital/branches", icon: MapPin },
    { label: "Reviews", link: "/hospital/reviews", icon: Star },
  ];

  const profileMenuItems = [
    { label: "Profile", link: "/hospital/profile", icon: User },
    { label: "Diagnostics", link: "/hospital/diagnostics", icon: Microscope },
    { label: "Price Charts", link: "/hospital/price-charts", icon: DollarSign },
    {
      label: "Health Packages",
      link: "/hospital/health-packages",
      icon: ShieldPlus,
    },
    {
      label: "Floor Wise Details",
      link: "/hospital/floor-wise-details",
      icon: Layers,
    },
    { label: "Gallery", link: "/hospital/gallery", icon: Images },
  ];

  const menuItems = [
    { label: "Users", link: "/hospital/users", icon: Users },
    { label: "Settings", link: "/hospital/settings", icon: Settings },
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
          <nav className="mt-5 px-4 py-4 !pt-0 lg:mt-5 lg:px-6">
            {/* Logo */}
            <div className="mb-6 ml-4 flex items-center justify-start border-b border-slate-100 pb-4 dark:border-slate-800">
              <Link href="/" className="flex items-center">
                {hospitalLogo ? (
                  <Image
                    src={hospitalLogo}
                    alt="Hospital Logo"
                    width={100}
                    height={100}
                    className="w-full h-auto object-contain"
                  />
                ) : (
                  <span className="text-2xl font-bold text-slate-800 dark:text-white">
                    Healtha<span className="text-blue-500">.</span>
                  </span>
                )}
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
                  Hospital
                </h3>
              )}

              <ul
                className={cn(
                  "flex flex-col gap-1",
                  sidebarOpen
                    ? "items-stretch"
                    : "flex items-center justify-center",
                )}
              >
                {hospitalMenuItems.map((item) => {
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

            {/* Profile Menu */}
            <div className="mt-8">
              {sidebarOpen && (
                <h3
                  className={cn(
                    "mb-4 ml-4 text-sm font-semibold uppercase tracking-wider",
                    darkMode ? "text-slate-200" : "text-slate-600",
                  )}
                >
                  Profile
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

export default HospitalDashboardSidebar;
