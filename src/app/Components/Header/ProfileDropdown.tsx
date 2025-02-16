"use client";

import ClickOutside from "@/components/ClickOutside";
import { ChevronDown, Home, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

const ProfileDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const session = {
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      image: "https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png",
    },
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-lg font-medium text-black dark:text-white">
            {session.user.name || "User"}
          </span>
          <span className="block text-base">{session.user.email}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <Image
            width={48}
            height={48}
            className="rounded-full"
            src={session.user.image || "/images/user/default-user.webp"}
            alt="User"
          />
        </span>

        <ChevronDown className="hidden sm:block" size={20} />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <ul className="flex flex-col gap-5 border-b border-stroke px-4 py-4 dark:border-strokedark">
            <li>
              <Link
                href="/"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <Home size={22} />
                Frontend
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <User size={22} />
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <Settings size={22} />
                Settings
              </Link>
            </li>
          </ul>
          <LogoutButton />
        </div>
      )}
    </ClickOutside>
  );
};

export default ProfileDropdown;
