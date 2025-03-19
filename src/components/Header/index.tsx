"use client";

import { useAuth } from "@/store/useAuth";
import Link from "next/link";
import HealthaIcon from "../HealthaIcon";
import HealthaTextLogo from "../HealthaTextLogo";
import PopupNotificationModel from "../Notifications/PopupNotificationModel";
import TopHeaderNotification from "../Notifications/TopHeaderNotification";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";

interface HeaderProps {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  isMobile?: boolean;
}

const Header = ({ sidebarOpen, setSidebarOpen, isMobile }: HeaderProps) => {
  const { user } = useAuth();

  return (
    <>
      <TopHeaderNotification />
      <PopupNotificationModel />
      <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
        <div className="flex flex-grow items-center justify-between px-4 py-3 shadow-2 md:px-6 2xl:px-11">
          <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
            {/* <!-- Hamburger Toggle BTN --> */}
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
              className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
            >
              <span className="relative block h-5.5 w-5.5 cursor-pointer">
                <span className="du-block absolute right-0 h-full w-full">
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                      !sidebarOpen && "!w-full delay-300"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                      !sidebarOpen && "delay-400 !w-full"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                      !sidebarOpen && "!w-full delay-500"
                    }`}
                  ></span>
                </span>
                <span className="absolute right-0 h-full w-full rotate-45">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                      !sidebarOpen && "!h-0 !delay-[0]"
                    }`}
                  ></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                      !sidebarOpen && "!h-0 !delay-200"
                    }`}
                  ></span>
                </span>
              </span>
            </button>
            {/* <!-- Hamburger Toggle BTN --> */}
            <div className="block flex-shrink-0 lg:hidden">
              <HealthaIcon />
            </div>
          </div>

          <div className="hidden sm:block">
            {/* text logo */}
            <HealthaTextLogo />
          </div>

          <div className="flex items-center gap-3 2xsm:gap-7">
            <ul className="flex items-center gap-2 2xsm:gap-4">
              {!user ? (
                // Show these links only when user is not logged in
                <>
                  <Link
                    href="/auth/login"
                    className="rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="rounded-md bg-black px-3 py-2 text-base font-medium text-white hover:bg-black/90"
                  >
                    Register
                  </Link>
                </>
              ) : (
                // Show these items when user is logged in
                <>
                  {/* <!-- Dark Mode Toggler --> */}
                  <DarkModeSwitcher />

                  {/* <!-- Notification Menu Area --> */}
                  <DropdownNotification />

                  {/* <!-- Chat Notification Area --> */}
                  <DropdownMessage />
                </>
              )}
            </ul>

            {/* <!-- User Area --> */}
            <DropdownUser />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
