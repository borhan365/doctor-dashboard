"use client";

import ClickOutside from "@/components/ClickOutside";
import { useDoctorDetails } from "@/store/useDoctorDetails";
import { ChevronDown, Home, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { MdAdminPanelSettings } from "react-icons/md";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  // Static demo data
  const user = {
    id: "demo-user-id",
    name: "Dr. John Doe",
    email: "john.doe@example.com",
    image: "/images/user/default-user.webp",
    doctorSlug: "demo-doctor",
    doctorId: "demo-doctor-id",
  };

  const { data: doctor, isLoading } = useDoctorDetails();

  const handleLogout = async () => {
    try {
      setDropdownOpen(false);
      // Static demo - no actual logout needed
      toast.success("Logged out successfully (demo mode)");
      router.push("/");
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
    <ClickOutside onClick={() => setDropdownOpen(false)}>
      <div className="relative">
        <Link
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-4"
          href="#"
        >
          <span className="hidden text-right lg:block">
            <span className="block text-sm font-medium text-black dark:text-white">
              {userData.name}
            </span>
            <span className="block text-xs text-slate-500">
              {userData.email}
            </span>
          </span>

          <span className="h-12 w-12 rounded-full">
            <Image
              width={112}
              height={112}
              src={userData.image}
              alt="User"
              className="h-full w-full rounded-full object-cover"
            />
          </span>

          <ChevronDown className="hidden fill-current sm:block" />
        </Link>

        {/* <!-- Dropdown Start --> */}
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-xl dark:border-strokedark dark:bg-boxdark ${
            dropdownOpen === true ? "block" : "hidden"
          }`}
        >
          <ul className="flex h-auto flex-col overflow-y-auto">
            <li>
              <Link
                className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                href="/dashboard"
                onClick={() => setDropdownOpen(false)}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                href="/dashboard/profile"
                onClick={() => setDropdownOpen(false)}
              >
                <Settings className="h-5 w-5" />
                Profile Settings
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                href="/dashboard/settings"
                onClick={() => setDropdownOpen(false)}
              >
                <MdAdminPanelSettings className="h-5 w-5" />
                Account Settings
              </Link>
            </li>
            <li>
              <button
                className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Log Out
              </button>
            </li>
          </ul>
        </div>
        {/* <!-- Dropdown End --> */}
      </div>
    </ClickOutside>
  );
};

export default DropdownUser;
