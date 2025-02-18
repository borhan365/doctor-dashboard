"use client";

import Footer from "@/app/Components/Footer/page";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "min-h-screen w-full bg-slate-50",
        "dark:bg-slate-900 dark:text-slate-200",
        "transition-colors duration-300",
        "overflow-x-hidden",
      )}
    >
      <div className="relative flex">
        <div
          className={cn(
            "min-h-screen flex-1",
            "pl-0 transition-all duration-300 ease-in-out",
          )}
        >
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>{children}</main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
