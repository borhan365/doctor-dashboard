import { Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ModelOne from '/public/images/doctor/model-1.webp'
import ModelTwo from '/public/images/doctor/model-2.webp'

interface RecentAppointment {
  id: string
  patient: {
    name: string
    image: string
    email: string
    phone: string
  }
  date: string
  time: string
  type: {
    primary: string
    secondary: string
  }
}

const recentAppointments: RecentAppointment[] = [
  {
    id: 'Apt0001',
    patient: {
      name: 'Adrian',
      image: ModelOne.src,
      email: 'adran@example.com',
      phone: '+1 504 368 6874'
    },
    date: '11 Nov 2024',
    time: '10.45 AM',
    type: {
      primary: 'General Visit',
      secondary: 'Chat'
    }
  },
  {
    id: 'Apt0003',
    patient: {
      name: 'Samuel',
      image: ModelTwo.src,
      email: 'samuel@example.com',
      phone: '+1 749 104 6291'
    },
    date: '27 Oct 2024',
    time: '09.30 AM',
    type: {
      primary: 'General Visit',
      secondary: 'Video Call'
    }
  },
  {
    id: 'Apt0005',
    patient: {
      name: 'Emily',
      image: ModelOne.src,
      email: 'emily@example.com',
      phone: '+1 123 456 7890'
    },
    date: '03 Dec 2024',
    time: '02.15 PM',
    type: {
      primary: 'Follow-up',
      secondary: 'Phone Call'
    }
  },
  {
    id: 'Apt0007',
    patient: {
      name: 'Michael',
      image: ModelTwo.src,
      email: 'michael@example.com',
      phone: '+1 987 654 3210'
    },
    date: '15 Jan 2025',
    time: '11.00 AM',
    type: {
      primary: 'New Patient',
      secondary: 'In-person'
    }
  },
  {
    id: 'Apt0009',
    patient: {
      name: 'Sarah',
      image: ModelOne.src,
      email: 'sarah@example.com',
      phone: '+1 555 555 5555'
    },
    date: '22 Feb 2025',
    time: '03.45 PM',
    type: {
      primary: 'Check-up',
      secondary: 'Virtual'
    }
  }
]

export default function RecentAppointments() {
  return (
    <div className="mx-auto w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-700">
          Appointments
        </h2>
        {/* count of records */}
        <p className="text-sm text-slate-500">
          We found{" "}
          <span className="font-semibold text-violet-500">
            {recentAppointments.length}
          </span>{" "}
          appointments
        </p>
      </div>
      <div className="rounded-lg bg-white shadow-sm p-4">
        <table className="w-full border border-slate-100 rounded-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Patient</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Date & Time</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Contact</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">View</th>
            </tr>
          </thead>
          <tbody>
            {recentAppointments.map((appointment) => (
              <tr key={appointment.id} className="border-b border-gray-200">
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12">
                      <Image
                        src={appointment.patient.image || "/placeholder.svg"}
                        alt=""
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {appointment.patient.name}
                        </span>
                      </div>
                      <div className="text-sm text-blue-600">#{appointment.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {appointment.date} {appointment.time}
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {appointment.type.primary} • {appointment.type.secondary}
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  <div className="font-medium text-gray-900">
                    {appointment.patient.email}
                  </div>
                  <div className="text-gray-500">{appointment.patient.phone}</div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  <Link
                    href={`/doctor/appointments/${appointment.id}`}
                    className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <Eye className="h-5 w-5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

