"use client";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-boxdark lg:flex-row">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="relative flex flex-1 flex-col overflow-x-hidden">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed left-4 top-4 z-999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
        >
          <span className="relative block h-5.5 w-5.5 cursor-pointer">
            <span className="du-block absolute right-0 h-full w-full">
              <span className="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white">
                <span className="absolute right-0 h-0.5 w-[20px] rotate-0 bg-black dark:bg-white" />
              </span>
              <span className="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white">
                <span className="absolute right-0 h-0.5 w-[20px] rotate-0 bg-black dark:bg-white" />
              </span>
              <span className="relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white">
                <span className="absolute right-0 h-0.5 w-[20px] rotate-0 bg-black dark:bg-white" />
              </span>
            </span>
          </span>
        </button>

        {/* Main Content Area */}
        <main className="relative flex-1 pt-20 sm:pt-0">{children}</main>
      </div>
    </div>
  );
}
