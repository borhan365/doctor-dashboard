"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function PatientMenu({ patientId }: { patientId: string }) {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Appointments",
      href: `/doctor/patients/${patientId}/appointments`,
    },
    {
      label: "Prescriptions",
      href: `/doctor/patients/${patientId}/prescriptions`,
    },
    {
      label: "Medical Records",
      href: `/doctor/patients/${patientId}/medical-records`,
    },
    {
      label: "Invoices",
      href: `/doctor/patients/${patientId}/invoices`,
    },
  ];

  // Check if any menu item is active based on current pathname
  const hasActiveItem = menuItems.some(
    (item) =>
      pathname === item.href ||
      (item.href === `/doctor/patients/${patientId}` &&
        pathname.endsWith("#general-info")),
  );

  return (
    <div className="no-scrollbar mt-6 overflow-x-auto border-t border-slate-100">
      <div className="flex min-w-max space-x-8 px-1">
        {menuItems.map((item) => {
          const isActive = hasActiveItem
            ? pathname === item.href ||
              (item.href === `/doctor/patients/${patientId}` &&
                pathname.endsWith("#general-info"))
            : item.label === "Overview"; // Set Overview as active if no other item is active

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative py-4 text-sm font-medium transition-colors hover:text-blue-600
                ${
                  isActive
                    ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600"
                    : "text-slate-600 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:h-0.5 hover:after:w-full hover:after:bg-blue-600/30"
                }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default PatientMenu;
