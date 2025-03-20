"use client";
import { Button } from "antd";
import { useState } from "react";
import AppointmentDrawer from "./ui/AppointmentDrawer";
import { AppointmentsList } from "./ui/AppointmentsList";

export default function AppointmentsPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto px-4">
        <div className="flex items-center gap-2">
          <Button type="primary" onClick={() => setIsOpen(true)}>
            New Appointment
          </Button>
        </div>
        <div className="mt-6 rounded-lg bg-white p-4 shadow-sm md:p-6">
          <AppointmentsList />
        </div>
      </div>

      <AppointmentDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
