"use client";

import { Eye, MessageSquare, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Appointment {
  id: string;
  patient: {
    name: string;
    image: string;
    email: string;
    phone: string;
  };
  date: string;
  time: string;
  type: {
    primary: string;
    secondary: string;
  };
  isNew?: boolean;
}

const appointments: Appointment[] = [
  {
    id: "Apt0001",
    patient: {
      name: "Adrian",
      image:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-01.jpg",
      email: "adran@example.com",
      phone: "+1 504 368 6874",
    },
    date: "11 Nov 2024",
    time: "10.45 AM",
    type: {
      primary: "General Visit",
      secondary: "Video Call",
    },
  },
  {
    id: "Apt0002",
    patient: {
      name: "Kelly",
      image:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-07.jpg",
      email: "kelly@example.com",
      phone: "+1 832 891 8403",
    },
    date: "05 Nov 2024",
    time: "11.50 AM",
    type: {
      primary: "General Visit",
      secondary: "Audio Call",
    },
    isNew: true,
  },
  {
    id: "Apt0003",
    patient: {
      name: "Samuel",
      image:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-03.jpg",
      email: "samuel@example.com",
      phone: "+1 749 104 6291",
    },
    date: "27 Oct 2024",
    time: "09.30 AM",
    type: {
      primary: "General Visit",
      secondary: "Video Call",
    },
  },
  {
    id: "Apt0004",
    patient: {
      name: "Catherine",
      image:
        "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-07.jpg",
      email: "catherine@example.com",
      phone: "+1 584 920 7183",
    },
    date: "18 Oct 2024",
    time: "12.20 PM",
    type: {
      primary: "General Visit",
      secondary: "Direct Visit",
    },
  },
];

export function AppointmentsList() {
  return (
    <div className="mt-6">
      <div className="divide-y divide-gray-200">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-4 md:items-center"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12">
                <Image
                  src={
                    appointment.patient.image ||
                    "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors/doctor-thumb-07.jpg"
                  }
                  alt=""
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Link href={`/dashboard/appointments/${appointment.id}`}>
                    <span className="font-medium text-gray-900">
                      {appointment.patient.name}
                    </span>
                  </Link>
                  {appointment.isNew && (
                    <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                      New
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500">#{appointment.id}</div>
              </div>
            </div>

            <div className="text-sm">
              <div className="font-medium text-gray-900">
                {appointment.date} {appointment.time}
              </div>
              <div className="text-gray-500">
                {appointment.type.primary} • {appointment.type.secondary}
              </div>
            </div>

            <div className="text-sm">
              <div className="font-medium text-gray-900">
                {appointment.patient.email}
              </div>
              <div className="text-gray-500">{appointment.patient.phone}</div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <Eye className="h-5 w-5" />
              </button>
              <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <MessageSquare className="h-5 w-5" />
              </button>
              <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
              <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
                Start Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
