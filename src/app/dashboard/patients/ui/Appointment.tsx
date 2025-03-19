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

export default function Appointments() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        Recent Appointments
      </h2>
      <div className="mt-6 divide-y divide-gray-200">
        {recentAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-4"
          >
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

            <div className="flex items-center justify-end">
              <Link
                href={`/dashboard/appointments/${appointment.id}`}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              >
                <Eye className="h-5 w-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

