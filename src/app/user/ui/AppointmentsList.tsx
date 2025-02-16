"use client";

import { CalendarIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

// Data
const appointments: Appointment[] = [
  {
    id: 1,
    doctor: "Dr.Cara Stevens",
    specialty: "Radiologist",
    date: "12 June '20",
    time: "09:00-10:00",
    contactNumber: "+123 67654555",
    avatar:
      "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-02.jpg",
  },
  {
    id: 2,
    doctor: "Dr.Emily Johnson",
    specialty: "Cardiologist",
    date: "15 July '20",
    time: "10:00-11:00",
    contactNumber: "+123 67654556",
    avatar:
      "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-03.jpg",
  },
  {
    id: 3,
    doctor: "Dr.John Doe",
    specialty: "Neurologist",
    date: "20 August '20",
    time: "11:00-12:00",
    contactNumber: "+123 67654557",
    avatar:
      "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-04.jpg",
  },
  {
    id: 4,
    doctor: "Dr.Sarah Taylor",
    specialty: "Dermatologist",
    date: "25 September '20",
    time: "12:00-13:00",
    contactNumber: "+123 67654558",
    avatar:
      "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-05.jpg",
  },
  {
    id: 5,
    doctor: "Dr.Michael Brown",
    specialty: "Orthopedic",
    date: "30 October '20",
    time: "13:00-14:00",
    contactNumber: "+123 67654559",
    avatar:
      "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-06.jpg",
  },
  {
    id: 6,
    doctor: "Dr.Lisa Nguyen",
    specialty: "Gynecologist",
    date: "5 November '20",
    time: "14:00-15:00",
    contactNumber: "+123 67654560",
    avatar:
      "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-07.jpg",
  },
  {
    id: 7,
    doctor: "Dr.David Lee",
    specialty: "Oncologist",
    date: "10 December '20",
    time: "15:00-16:00",
    contactNumber: "+123 67654561",
    avatar:
      "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-08.jpg",
  },
  {
    id: 8,
    doctor: "Dr.Karen White",
    specialty: "Pediatrician",
    date: "15 January '21",
    time: "16:00-17:00",
    contactNumber: "+123 67654562",
    avatar:
      "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-09.jpg",
  },
  {
    id: 9,
    doctor: "Dr.Richard Hall",
    specialty: "Urologist",
    date: "20 February '21",
    time: "17:00-18:00",
    contactNumber: "+123 67654563",
    avatar:
      "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-10.jpg",
  },
  {
    id: 10,
    doctor: "Dr.James Smith",
    specialty: "Ophthalmologist",
    date: "25 March '21",
    time: "18:00-19:00",
    contactNumber: "+123 67654564",
    avatar:
      "https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/profile-11.jpg",
  },
];

interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  contactNumber: string;
  avatar: string;
}

export default function AppointmentsList() {
  const [tab, setTab] = useState("upcoming");

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            {tab === "upcoming" ? "Upcoming Appointments" : "Past Appointments"}
          </h3>
          <div className="flex space-x-3">
            <button
              className={`rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-200 ${
                tab === "upcoming" ? "bg-blue-100 text-blue-600" : "text-gray-500"
              }`}
              onClick={() => setTab("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-200 ${
                tab === "past" ? "bg-blue-100 text-blue-600" : "text-gray-500"
              }`}
              onClick={() => setTab("past")}
            >
              Past
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {appointments?.slice(0, 4).map((appointment) => (
            <div
              key={appointment.id}
              className="flex flex-col items-center justify-between space-y-4 rounded-lg border p-4 md:flex-row md:space-y-0"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={appointment.avatar}
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {appointment.doctor}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {appointment.specialty}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    {appointment.date}
                  </div>
                  <div className="mt-1 flex items-center">
                    <PhoneIcon className="mr-1 h-4 w-4" />
                    {appointment.contactNumber}
                  </div>
                </div>

                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Cancel appointment</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
