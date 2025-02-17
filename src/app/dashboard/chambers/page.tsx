"use client";

import { useDoctorProfileByUser } from "@/hooks/doctor/getDoctorProfileByUser";
import { Chamber } from "@/types/chamber";
import {
  Building2,
  Clock,
  Edit2,
  MapPin,
  Phone,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useChambers } from "@/hooks/doctor/chamber/useChambers";
import { toast } from "sonner";

// Add this mock data at the top of your component
const mockChambers: Chamber[] = [
  {
    id: "1",
    hospitalId: "1",
    floorNumber: "3rd Floor",
    roomNumber: "Room 305",
    shift: "Evening",
    address: "123 Medical Center Road, Gulshan",
    city: "Dhaka",
    newPatientFee: 1000,
    oldPatientFee: 800,
    followUpFee: 500,
    followUpFeeNote: "Valid within 30 days",
    followUpFeeNoteBn: "৩০ দিনের মধ্যে বৈধ",
    contactNumbers: ["01712345678", "01812345678"],
    slotDuration: 15,
    breakTime: 30,
    maxPatients: 3,
    availableDays: [
      {
        id: "day1",
        day: "Saturday",
        fromTime: "4:00 PM",
        toTime: "9:00 PM",
        isAvailable: true,
        timeSlots: [
          {
            id: "slot1",
            startTime: "4:00 PM",
            endTime: "4:15 PM",
            isAvailable: true,
            maxPatients: 3,
          },
          {
            id: "slot2",
            startTime: "4:15 PM",
            endTime: "4:30 PM",
            isAvailable: true,
            maxPatients: 3,
          },
        ],
      },
      {
        id: "day2",
        day: "Sunday",
        fromTime: "5:00 PM",
        toTime: "10:00 PM",
        isAvailable: true,
        timeSlots: [
          {
            id: "slot3",
            startTime: "5:00 PM",
            endTime: "5:15 PM",
            isAvailable: true,
            maxPatients: 3,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    hospitalId: "1",
    floorNumber: "5th Floor",
    roomNumber: "Room 502",
    shift: "Morning",
    address: "45 Diagnostic Lane, Dhanmondi",
    city: "Dhaka",
    newPatientFee: 1200,
    oldPatientFee: 1000,
    followUpFee: 600,
    followUpFeeNote: "Valid within 15 days",
    followUpFeeNoteBn: "১৫ দিনের মধ্যে বৈধ",
    contactNumbers: ["01912345678", "01612345678"],
    slotDuration: 20,
    breakTime: 15,
    maxPatients: 2,
    availableDays: [
      {
        id: "day3",
        day: "Monday",
        fromTime: "9:00 AM",
        toTime: "2:00 PM",
        isAvailable: true,
        timeSlots: [
          {
            id: "slot4",
            startTime: "9:00 AM",
            endTime: "9:20 AM",
            isAvailable: true,
            maxPatients: 2,
          },
        ],
      },
      {
        id: "day4",
        day: "Wednesday",
        fromTime: "10:00 AM",
        toTime: "3:00 PM",
        isAvailable: true,
        timeSlots: [
          {
            id: "slot5",
            startTime: "10:00 AM",
            endTime: "10:20 AM",
            isAvailable: true,
            maxPatients: 2,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    hospitalId: "1",
    floorNumber: "2nd Floor",
    roomNumber: "Room 203",
    shift: "Afternoon",
    address: "32 Green Road, Green Life Tower",
    city: "Dhaka",
    newPatientFee: 800,
    oldPatientFee: 600,
    followUpFee: 400,
    followUpFeeNote: "Valid within 20 days",
    followUpFeeNoteBn: "২০ দিনের মধ্যে বৈধ",
    contactNumbers: ["01512345678"],
    slotDuration: 30,
    breakTime: 20,
    maxPatients: 4,
    availableDays: [
      {
        id: "day5",
        day: "Tuesday",
        fromTime: "2:00 PM",
        toTime: "7:00 PM",
        isAvailable: true,
        timeSlots: [
          {
            id: "slot6",
            startTime: "2:00 PM",
            endTime: "2:30 PM",
            isAvailable: true,
            maxPatients: 4,
          },
        ],
      },
      {
        id: "day6",
        day: "Thursday",
        fromTime: "3:00 PM",
        toTime: "8:00 PM",
        isAvailable: true,
        timeSlots: [
          {
            id: "slot7",
            startTime: "3:00 PM",
            endTime: "3:30 PM",
            isAvailable: true,
            maxPatients: 4,
          },
        ],
      },
    ],
  },
];

// Chamber Card Component
const ChamberCard = ({ chamber }: { chamber: Chamber }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      // Implement delete functionality
      toast.success("Chamber deleted successfully");
    } catch (error) {
      toast.error("Failed to delete chamber");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      {/* Action Buttons */}
      <div className="absolute right-4 top-4 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <Link href={`/doctor/chambers/${chamber.id}/edit`}>
          <button className="rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 hover:text-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-300">
            <Edit2 className="h-4 w-4" />
          </button>
        </Link>
        <button
          onClick={handleDelete}
          className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200 hover:text-red-700 dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-900 dark:hover:text-red-300"
          disabled={isDeleting}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Chamber Info */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
            {chamber.hospitalId}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <MapPin className="h-4 w-4" />
            <span>{chamber.address}</span>
          </div>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-4 dark:border-slate-700">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-800 dark:text-slate-200">
              Floor: {chamber.floorNumber}
            </span>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              Room: {chamber.roomNumber}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Fees</span>
            <div className="text-right">
              <div className="font-medium text-slate-800 dark:text-slate-200">
                ৳{chamber.newPatientFee} (New)
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                ৳{chamber.oldPatientFee} (Old)
              </div>
              {chamber.followUpFee && (
                <div className="text-xs text-slate-500 dark:text-slate-500">
                  ৳{chamber.followUpFee} (Follow-up)
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Schedule Preview */}
        <div className="mt-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
          <div className="mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-400" />
            <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Schedule
            </h4>
          </div>
          <div className="grid gap-1 text-sm text-slate-600 dark:text-slate-400">
            {chamber.availableDays.map((schedule) => (
              <div key={schedule.id} className="flex justify-between">
                <span className="font-medium">{schedule.day}</span>
                <span>
                  {schedule.fromTime} - {schedule.toTime}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function Chambers() {
  const user = {
    id: "1234567890",
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://via.placeholder.com/150",
    doctorProfile: {
      id: "1234567890",
      name: "John Doe",
      email: "john.doe@example.com",
      image: "https://via.placeholder.com/150",
    },
  };
  const { chambers, isLoading, error } = useChambers();

  // Loading State
  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8 space-y-4">
          <div className="h-8 w-1/4 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-1/3 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[280px] animate-pulse rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800/50"
            />
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/20">
          <p className="text-center text-sm text-red-600 dark:text-red-400">
            Error loading chambers. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Empty State
  if (!chambers || chambers.length === 0) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Chambers
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Manage your practice locations and schedules
            </p>
          </div>
          <Link href="/doctor/chambers/create" className="mt-4 sm:mt-0">
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:bg-blue-600 sm:w-auto">
              <Plus className="h-4 w-4" />
              Add Chamber
            </button>
          </Link>
        </div>
        <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white dark:border-slate-800 dark:bg-slate-800/50">
          <div className="text-center">
            <Building2 className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-600" />
            <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-200">
              No chambers added
            </h3>
            <p className="mt-1 text-base text-slate-500 dark:text-slate-400">
              Add your first chamber to start managing your practice locations
            </p>
            <Link href="/doctor/chambers/create">
              <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-base font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:bg-blue-600">
                <Plus className="h-5 w-5" />
                Add Chamber
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Chambers ({chambers.length})
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Manage your practice locations and schedules
          </p>
        </div>
        <Link href="/doctor/chambers/create" className="mt-4 sm:mt-0">
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:bg-blue-600 sm:w-auto">
            <Plus className="h-4 w-4" />
            Add Chamber
          </button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {chambers.map((chamber: Chamber) => (
          <ChamberCard key={chamber.id} chamber={chamber} />
        ))}
      </div>
    </div>
  );
}

export default Chambers;
