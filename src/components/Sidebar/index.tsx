import React, { useEffect, useRef, useState } from "react";
import { FiEdit, FiUsers } from "react-icons/fi";
import {
  IoChevronDownSharp,
  IoDocumentsOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import {
  MdMyLocation,
  MdOutlineMail,
  MdOutlinePermMedia,
  MdOutlineReviews,
} from "react-icons/md";

import {
  DollarSign,
  Hospital,
  Key,
  LayoutDashboard,
  LogOut,
  Mails,
  MessageSquareText,
  SquarePen,
  Target,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsQuestionCircle } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import SidebarLinkGroup from "./SidebarLinkGroup";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);

  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);

  useEffect(() => {
    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
    setSidebarExpanded(
      storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <aside
      ref={sidebar}
      className={`fixed bottom-0 left-0 top-0 z-999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:fixed lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-4">
        <Link href="/dashboard">
          {/* <Image
            width={176}
            height={32}
            src="/images/logo/logo.svg"
            alt="Logo"
            priority
          /> */}
          <h2 className="text-3xl font-bold text-white pt-2">
            Healtha<span className="text-primary">.</span>
          </h2>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <LogOut className="h-6 w-6" />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* Doctor */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Reviews --> */}
              <li>
                <Link
                  href="/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname?.includes("dashboard") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <LayoutDashboard className="size-5" />
                  Dashboard
                </Link>
              </li>
            </ul>

            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              HEALTHA
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Doctors --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/dashboard/doctors" ||
                  pathname?.includes("dashboard/doctors") ||
                  false
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/dashboard/doctors" ||
                            pathname?.includes("dashboard/doctors")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FiUsers className="h-5 w-5" />
                        Doctors
                        <IoChevronDownSharp
                          className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard/doctors"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/doctors" &&
                                "text-white"
                              }`}
                            >
                              All Doctors
                            </Link>
                          </li>
                          {/* Specialists */}
                          <li>
                            <Link
                              href="/dashboard/doctors/specialists"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/doctors/specialists" &&
                                "text-white"
                              }`}
                            >
                              Specialists
                            </Link>
                          </li>
                          {/* Treatments */}
                          <li>
                            <Link
                              href="/dashboard/doctors/treatments"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/doctors/treatments" &&
                                "text-white"
                              }`}
                            >
                              Treatments
                            </Link>
                          </li>
                          {/* Doctor Languages */}
                          <li>
                            <Link
                              href="/dashboard/doctors/languages"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/doctors/languages" &&
                                "text-white"
                              }`}
                            >
                              Languages
                            </Link>
                          </li>
                          {/* Doctor Types */}
                          <li>
                            <Link
                              href="/dashboard/doctors/types"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/doctors/types" &&
                                "text-white"
                              }`}
                            >
                              Doctor Types
                            </Link>
                          </li>
                          {/* Degrees */}
                          <li>
                            <Link
                              href="/dashboard/doctors/degrees"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/doctors/degrees" &&
                                "text-white"
                              }`}
                            >
                              Degrees
                            </Link>
                          </li>
                          {/* Prefixes */}
                          <li>
                            <Link
                              href="/dashboard/doctors/prefixes"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/doctors/prefixes" &&
                                "text-white"
                              }`}
                            >
                              Prefixes
                            </Link>
                          </li>
                          {/* Chambers */}
                          <li>
                            <Link
                              href="/dashboard/doctors/chambers"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/doctors/chambers" &&
                                "text-white"
                              }`}
                            >
                              Chambers
                            </Link>
                          </li>
                          {/* Educations */}
                          <li>
                            <Link
                              href="/dashboard/doctors/educations"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/doctors/educations" &&
                                "text-white"
                              }`}
                            >
                              Educations
                            </Link>
                          </li>
                          {/* Experiences */}
                          <li>
                            <Link
                              href="/dashboard/doctors/experiences"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/doctors/experiences" &&
                                "text-white"
                              }`}
                            >
                              Experiences
                            </Link>
                          </li>
                          {/* Add New Doctor */}
                          <li>
                            <Link
                              href="/dashboard/doctors/create"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/doctors/create" &&
                                "text-white"
                              }`}
                            >
                              Add New Doctor
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Doctors --> */}

              {/* <!-- Menu Item Hosptials --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/dashboard/hospitals" ||
                  pathname?.includes("dashboard/hospitals") ||
                  false
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/dashboard/hospitals" ||
                            pathname?.includes("dashboard/hospitals")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <Hospital className="h-5 w-5" />
                        Hospitals
                        <IoChevronDownSharp
                          className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard/hospitals"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/hospitals" &&
                                "text-white"
                              }`}
                            >
                              All Hospitals
                            </Link>
                          </li>
                          {/* Diagnostics */}
                          <li>
                            <Link
                              href="/dashboard/hospitals/diagnostics"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname ===
                                  "/dashboard/hospitals/diagnostics" &&
                                "text-white"
                              }`}
                            >
                              Diagnostics
                            </Link>
                          </li>
                          {/* Specialists */}
                          <li>
                            <Link
                              href="/dashboard/hospitals/specialists"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname ===
                                  "/dashboard/hospitals/specialists" &&
                                "text-white"
                              }`}
                            >
                              Specialists
                            </Link>
                          </li>
                          {/* Features */}
                          <li>
                            <Link
                              href="/dashboard/hospitals/features"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/hospitals/features" &&
                                "text-white"
                              }`}
                            >
                              Features
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/hospitals/types"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/hospitals/types" &&
                                "text-white"
                              }`}
                            >
                              Types
                            </Link>
                          </li>
                          {/* Add New Doctor */}
                          <li>
                            <Link
                              href="/dashboard/hospitals/create"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/hospitals/create" &&
                                "text-white"
                              }`}
                            >
                              Add New Hospital
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Doctors --> */}
              {/* <!-- Menu Item Locations --> */}
              <li>
                <Link
                  href="/dashboard/locations"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname?.includes("dashboard/locations") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <MdMyLocation className="size-5" />
                  Locations
                </Link>
              </li>
              {/* <!-- Menu Item Locations --> */}
            </ul>
          </div>
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              COMMONS
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item User --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/dashboard/users" ||
                  pathname?.includes("dashboard/users") ||
                  false
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/dashboard/users" ||
                            pathname?.includes("dashboard/users")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FiUsers className="h-5 w-5" />
                        Users
                        <IoChevronDownSharp
                          className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard/users"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/users" && "text-white"
                              }`}
                            >
                              All Users
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/users/roles"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/users/roles" &&
                                "text-white"
                              }`}
                            >
                              Roles
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/users/category-modules"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/users/category-modules" &&
                                "text-white"
                              }`}
                            >
                              Category Modules
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/users/role-permissions"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/users/role-permissions" &&
                                "text-white"
                              }`}
                            >
                              Role Permissions
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/users/create"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/users/create" &&
                                "text-white"
                              }`}
                            >
                              Add New User
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item User --> */}

              {/* Blog */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/dashboard/articles" ||
                  pathname?.includes("dashboard/articles") ||
                  false
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="/dashboard/articles"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/dashboard/articles" ||
                            pathname?.includes("dashboard/articles")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FiEdit className="h-5 w-5" />
                        Articles
                        <IoChevronDownSharp
                          className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard/articles"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/articles" &&
                                "text-white"
                              }`}
                            >
                              All Articles
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/articles/categories"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/articles/categories" &&
                                "text-white"
                              }`}
                            >
                              Categories
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/articles/create"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/articles/create" &&
                                "text-white"
                              }`}
                            >
                              Add New Article
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Blog */}

              {/* Pages */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/dashboard/pages" ||
                  pathname?.includes("dashboard/pages") ||
                  false
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/dashboard/pages" ||
                            pathname?.includes("dashboard/pages")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <IoDocumentsOutline className="h-5 w-5" />
                        Pages
                        <IoChevronDownSharp
                          className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard/pages"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/pages" && "text-white"
                              }`}
                            >
                              All Pages
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/templates"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/templates" &&
                                "text-white"
                              }`}
                            >
                              Templates
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/pages/create"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/dashboard/pages/create" &&
                                "text-white"
                              }`}
                            >
                              Add New Page
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Pages */}
            </ul>
          </div>

          {/* Global Group */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              GLOBALS
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Reviews --> */}
              <li>
                <Link
                  href="/dashboard/reviews"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname?.includes("dashboard/reviews") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaRegStar className="size-5" />
                  Reviews
                </Link>
              </li>
              {/* <!-- Menu Item Reviews --> */}
              {/* <!-- Menu Item testimonials --> */}
              <li>
                <Link
                  href="/dashboard/testimonials"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname?.includes("dashboard/testimonials") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <MdOutlineReviews className="size-5" />
                  Testimonials
                </Link>
              </li>
              {/* <!-- Menu Item testimonials --> */}
              {/* <!-- Menu Item faqs --> */}
              <li>
                <Link
                  href="/dashboard/faqs"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname?.includes("dashboard/faqs") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <BsQuestionCircle className="size-5" />
                  FAQ's
                </Link>
              </li>
              {/* <!-- Menu Item faqs --> */}
              {/* <!-- Menu Item chats --> */}
              <li>
                <Link
                  href="/dashboard/chats"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname?.includes("dashboard/chats") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <MessageSquareText className="size-5" />
                  Chats
                </Link>
              </li>
              {/* <!-- Menu Item chats --> */}
              {/* <!-- Menu Item emails --> */}
              <li>
                <Link
                  href="/dashboard/emails"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname?.includes("dashboard/emails") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <MdOutlineMail className="size-5" />
                  Emails
                </Link>
              </li>
              {/* <!-- Menu Item emails --> */}
              {/* <!-- Menu Item newsletters --> */}
              <li>
                <Link
                  href="/dashboard/newsletters"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname?.includes("dashboard/newsletters") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <Mails className="size-5" />
                  Newsletters
                </Link>
              </li>
              {/* <!-- Menu Item newsletters --> */}
              {/* <!-- Menu Item Media --> */}
              <li>
                <Link
                  href="/dashboard/media"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname?.includes("dashboard/media") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <MdOutlinePermMedia className="size-5" />
                  Media
                </Link>
              </li>
              {/* <!-- Menu Item Media --> */}
            </ul>
          </div>
          {/* Global Group */}

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item ads --> */}
              <li>
                <Link
                  href="/dashboard/ads"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname?.includes("dashboard/ads") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <Target className="size-5" />
                  Ads
                </Link>
              </li>
              {/* <!-- Menu Item ads --> */}
              {/* <!-- Menu Item accounts --> */}
              <li>

                <Link
                  href="/dashboard/accounts"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname?.includes("dashboard/accounts") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <DollarSign className="size-5" />
                  Accounts
                </Link>
              </li>
              {/* <!-- Menu Item accounts --> */}
              {/* <!-- Menu Item Settings --> */}
              <li>
                <Link
                  href="/dashboard/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname?.includes("dashboard/settings") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <IoSettingsOutline className="size-5" />
                  Settings
                </Link>
              </li>
              {/* <!-- Menu Item Settings --> */}

              {/* <!-- Menu Item Prompt --> */}
              <li>
                <Link
                  href="/dashboard/prompts"
                  className={`hover pathname?.includes("dashboard/prompts") && "bg-graydark dark:bg-meta-4" } group relative flex items-center gap-2.5 rounded-sm px-4                    py-2 font-medium
                    text-bodydark1 duration-300
                  ease-in-out`}
                >
                  <SquarePen className="size-5" />
                  Prompts
                </Link>
              </li>
              {/* <!-- Menu Item Prompt --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
