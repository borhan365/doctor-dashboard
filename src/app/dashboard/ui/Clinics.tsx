import Image from "next/image"

interface Clinic {
  id: string
  name: string
  image: string
  price: number
  hours: {
    day: string
    time: string
  }[]
}

export function Clinics({ clinics }: { clinics: Clinic[] }) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Clinics & Availability</h2>
      <div className="space-y-4">
        {clinics.map((clinic) => (
          <div key={clinic.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Image width={100} height={100} src={clinic.image || "/placeholder.svg"} alt="" className="w-12 h-12 rounded-lg" />
                <div>
                  <p className="font-medium">{clinic.name}</p>
                  <p className="text-blue-500">${clinic.price}</p>
                </div>
              </div>
              <button className="text-blue-500 text-sm">Change</button>
            </div>
            <div className="space-y-2">
              {clinic.hours.map((hour, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-500">{hour.day} :</span>
                  <span>{hour.time}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

