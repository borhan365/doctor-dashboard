"use client";

import ClickOutside from "@/components/ClickOutside";
import { useAuth } from "@/store/useAuth";
import { useDoctorDetails } from "@/store/useDoctorDetails";
import { BadgeCheck, ChevronDown, Home, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { MdAdminPanelSettings } from "react-icons/md";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();
  const { data: doctor, isLoading } = useDoctorDetails();

  const handleLogout = async () => {
    try {
      setDropdownOpen(false);
      await logout();
      toast.success("Logged out successfully");
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  if (!user) {
    return null;
  }

  const userData = {
    name: user.name,
    email: user.email,
    image: user.image || "/images/user/default-user.webp",
    doctorName: doctor?.name || "Loading...",
    bmdcNumber: doctor?.bmdcNumber,
  };

  // Status badge styling based on doctor status
  const getStatusBadgeStyle = () => {
    if (!doctor?.status) return "bg-gray-200 text-gray-700";

    switch (doctor.status.toLowerCase()) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-lg font-medium text-black dark:text-white">
            {isLoading ? "Loading..." : userData.doctorName}
          </span>
          <div className="flex items-center justify-end gap-2">
            {doctor?.status && (
              <span
                className={`mt-0.5 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${getStatusBadgeStyle()}`}
              >
                {doctor.status}
              </span>
            )}
            <span className="text-sm capitalize text-gray-600">
              {userData.name}
            </span>
          </div>
        </span>

        <span className="rounded-avatar relative h-12 w-12">
          <Image
            width={100}
            height={100}
            className="rounded-full object-cover"
            src={
              (doctor?.featuredImage as any)?.fileUrl ||
              user.image ||
              "/images/user/default-user.webp"
            }
            alt="User"
          />
          {doctor?.isVerified && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm">
              <BadgeCheck className="h-5 w-5 fill-blue-700 text-white" />
            </span>
          )}
        </span>

        <ChevronDown className="hidden sm:block" size={20} />
      </Link>

      {dropdownOpen && (
        <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6 py-3 dark:border-strokedark">
            <div className="flex items-center gap-3.5">
              <div>
                <h5 className="flex items-center justify-start gap-1 font-medium text-black dark:text-white">
                  {userData.name}

                  {user?.isVerified && (
                    <span className="flex h-3 w-3 items-center justify-center rounded-full bg-white shadow-sm">
                      <BadgeCheck className="h-3 w-3 text-primary" />
                    </span>
                  )}
                </h5>
                <p className="text-sm text-gray-600">{userData.email}</p>
              </div>
            </div>
          </div>
          <ul className="flex flex-col gap-3 border-b border-stroke px-6 py-4 dark:border-strokedark">
            <li>
              <Link
                href="/"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <Home size={22} />
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <MdAdminPanelSettings size={22} />
                Doctor Dashboard
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
          <button
            onClick={handleLogout}
            className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium text-danger duration-300 ease-in-out hover:text-primary lg:text-base"
          >
            <LogOut size={22} />
            Log Out
          </button>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
