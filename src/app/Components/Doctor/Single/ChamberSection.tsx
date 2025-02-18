import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const chambers = [
  {
    id: "1",
    name: "City Medical Center",
    address: "123 Medical Plaza, Downtown Area, City",
    image:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-4.0.3",
    phone: "+880 1234-567890",
    location: "Bongobondhu Avenue, Dhaka",
    schedule: [
      { days: "Saturday - Thursday", time: "6:00 PM - 9:00 PM" },
      { days: "Friday", time: "10:00 AM - 2:00 PM" },
    ],
    fees: {
      newPatient: 1000,
      followUp: 800,
    },
    features: [
      "Online Appointment",
      "Card Payment",
      "Wheelchair Access",
      "Parking Available",
    ],
  },
  {
    id: "2",
    name: "Health Plus Hospital",
    address: "456 Healthcare Avenue, North City",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3",
    phone: "+880 1234-567891",
    location: "Gulshan 1, Dhaka",
    schedule: [
      { days: "Monday - Wednesday", time: "5:00 PM - 8:00 PM" },
      { days: "Saturday", time: "11:00 AM - 3:00 PM" },
    ],
    fees: {
      newPatient: 1200,
      followUp: 900,
    },
    features: ["Emergency Service", "Lab Facilities", "Pharmacy", "Cafeteria"],
  }
];

function ChamberSection() {
  return (
    <div id="chambers" className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        {`Doctor's Chambers`}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {chambers.map((chamber) => (
          <div
            key={chamber.id}
            className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="relative h-48">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-800/90 mix-blend-multiply" />
              {chamber.image ? (
                <Image
                  src={chamber.image}
                  alt={chamber.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-200">
                  <span className="text-sm text-slate-500">No Image</span>
                </div>
              )}
            </div>

            <div className="flex-1 p-6">
              <Link href={`/hospitals/${chamber.id}`}>
                <h3 className="text-xl font-bold text-slate-900 hover:text-blue-600">
                  {chamber.name}
                </h3>
              </Link>

              <div className="mt-2 space-y-4">
                <div className="space-y-3 py-4 border-t border-b border-slate-100">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-slate-500" />
                    <div>
                      <p className="text-slate-600">{chamber.address}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {chamber.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-slate-500" />
                    <Link
                      className="text-slate-600 hover:text-slate-900"
                      href={`tel:${chamber.phone}`}
                    >
                      <p className="text-slate-600">{chamber.phone}</p>
                    </Link>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-slate-500" />
                    <div>
                      {chamber.schedule.map((time, index) => (
                        <p key={index} className="text-slate-600">
                          <span className="font-medium">{time.days}:</span>{" "}
                          {time.time}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">New Patient</p>
                      <p className="text-lg font-bold text-slate-900">
                        ৳{chamber.fees.newPatient}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Follow Up</p>
                      <p className="text-lg font-bold text-slate-900">
                        ৳{chamber.fees.followUp}
                      </p>
                    </div>
                  </div>

                  <button className="w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* see all chambers */}
      <div className="flex justify-end mt-6">
        <Link href={`/doctors/dr-tapas-chowdhury/chambers`} className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
          See All Chambers
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default ChamberSection;
