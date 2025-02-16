// Sidebar.tsx
"use client";

import { cn } from "@/lib/utils";
import {
  Ambulance,
  Building2,
  Calculator,
  HandHeart,
  Heart,
  HelpCircle,
  Home,
  Info,
  Mail,
  Newspaper,
  Pill,
  Plane,
  Settings,
  User,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  isMobile: boolean;
  darkMode: boolean;
}

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  isMobile,
  darkMode,
}: SidebarProps) => {
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", link: "/", icon: Home },
    { label: "Doctors", link: "/doctors", icon: UsersRound },
    { label: "Hospitals", link: "/hospitals", icon: Building2 },
    { label: "Tools", link: "/tools", icon: Calculator },
    { label: "Health Apps", link: "/apps", icon: Heart },
    { label: "Pharmaceuticals", link: "/pharmaceuticals", icon: Pill },
    { label: "Tourisms", link: "/tourisms", icon: Plane },
    { label: "Caregivers", link: "/caregivers", icon: HandHeart },
    { label: "Ambulances", link: "/ambulances", icon: Ambulance },
    { label: "Blog", link: "/blog", icon: Newspaper },
    { label: "FAQ's", link: "/faqs", icon: HelpCircle },
    { label: "About Page", link: "/about-us", icon: Info },
    { label: "Contact Us", link: "/contact-us", icon: Mail },
    {
      label: "Profile Settings",
      link: "/profile/settings",
      icon: Settings,
    },
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
          "fixed left-0 top-0 z-50 h-screen overflow-hidden border-r border-slate-200",
          "flex flex-col transition-transform duration-300 ease-in-out",
          darkMode ? "bg-boxdark text-white" : "bg-white text-black",
          isMobile
            ? `w-72 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`
            : `${sidebarOpen ? "w-72" : "w-20"}`,
          "overflow-y-auto",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar content */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            <div>
              {sidebarOpen && (
                <h3
                  className={cn(
                    "mb-4 ml-4 text-sm font-semibold uppercase tracking-wider",
                    darkMode ? "text-slate-400" : "text-slate-600",
                  )}
                >
                  Menu
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
                  const isActive = pathname === item.link;

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
                              "whitespace-nowrap rounded-md bg-black px-2 py-1",
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

export default Sidebar;
