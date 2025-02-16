import { MessageSquare, Video } from "lucide-react";
import Image from "next/image";

import dashboardCircleBg from "/public/images/bg/dashboard-circle-bg.png";

interface UpcomingAppointment {
  id: string;
  name: string;
  avatar: string;
  type: string;
  time: string;
}

export function UpcomingAppointment({
  appointment,
}: {
  appointment: UpcomingAppointment;
}) {
  return (
    <div className="relative mb-4 rounded-lg bg-blue-600 p-6 text-white shadow-sm">
      <Image
        src={dashboardCircleBg}
        alt=""
        fill
        className="absolute left-0 top-0 h-full w-auto object-cover opacity-10"
      />

      <div className="relative mb-4 flex items-center gap-4">
        {appointment.avatar ? (
          <Image
            src={appointment.avatar}
            alt={appointment.name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            {appointment.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-sm text-white/80">#{appointment.id}</p>
          <p className="font-medium">{appointment.name}</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg font-medium">{appointment.type}</p>
        <p className="text-sm text-white/80">Today, {appointment.time}</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm transition hover:bg-white/30">
          <Video className="h-4 w-4" />
          Video Call
        </button>
        <button className="rounded-lg bg-white px-4 py-2 text-sm text-blue-500 transition hover:bg-white/90">
          <span className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat Now
          </span>
        </button>
      </div>
    </div>
  );
}
