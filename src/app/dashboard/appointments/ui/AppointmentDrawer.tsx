"use client";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { Drawer } from "antd";
import { User } from "lucide-react";
import { useState } from "react";
import SelectChamber from "./SelectChamber";
import SelectPatient from "./SelectPatient";

interface AppointmentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function AppointmentDrawer({ isOpen, onClose }: AppointmentDrawerProps) {
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    patientPhone: "",
    patientAge: "",
    patientGender: "",
    date: "",
    time: "",
    department: "",
    doctor: "",
    appointmentType: "in-person",
    symptoms: "",
    previousHistory: "",
    preferredLanguage: "english",
    emergencyContact: "",
    paymentMethod: "cash",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  return (
    <Drawer
      title="New Appointment"
      width={720}
      onClose={onClose}
      open={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select Patient Section */}
        <SelectPatient
          formData={formData}
          handleInputChange={handleInputChange}
        />

        {/* Select Chamber Section */}
        <SelectChamber />

        {/* Patient Information Section */}
        <div className="mb-4">
          <h4 className="mb-4 text-lg font-medium">Patient Information</h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Patient Name */}
            <div>
              <label
                htmlFor="patientName"
                className="block text-sm font-medium text-gray-700"
              >
                Patient Name*
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="patientName"
                  required
                  placeholder="Enter Patient Name"
                  className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-base font-medium text-slate-800 placeholder:font-normal placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.patientName}
                  onChange={(e) =>
                    setFormData({ ...formData, patientName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Patient Phone */}
            <div>
              <label
                htmlFor="patientPhone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number*
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="patientPhone"
                  required
                  placeholder="Enter Patient Phone Number"
                  className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-base font-medium text-slate-800 placeholder:font-normal placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.patientPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, patientPhone: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Patient Age */}
            <div>
              <label
                htmlFor="patientAge"
                className="block text-sm font-medium text-gray-700"
              >
                Age*
              </label>
              <input
                type="number"
                id="patientAge"
                placeholder="Enter Patient Age"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base font-medium text-slate-800 placeholder:font-normal placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.patientAge}
                onChange={(e) =>
                  setFormData({ ...formData, patientAge: e.target.value })
                }
              />
            </div>

            {/* Patient Gender */}
            <div>
              <label
                htmlFor="patientGender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender*
              </label>
              <select
                id="patientGender"
                required
                placeholder="Select Gender"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base font-medium text-slate-800 placeholder:font-normal placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.patientGender}
                onChange={(e) =>
                  setFormData({ ...formData, patientGender: e.target.value })
                }
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appointment Details Section */}
        <div className="mb-6">
          <h4 className="mb-4 text-lg font-medium">Appointment Details</h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date*
              </label>
              <input
                type="date"
                id="date"
                required
                placeholder="Enter Appointment Date"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base font-medium text-slate-800 placeholder:font-normal placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            {/* Time */}
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Time*
              </label>
              <input
                type="time"
                id="time"
                required
                placeholder="Enter Appointment Time"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base font-medium text-slate-800 placeholder:font-normal placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
            </div>

            {/* Appointment Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Appointment Type*
              </label>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="appointmentType"
                    value="in-person"
                    checked={formData.appointmentType === "in-person"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        appointmentType: e.target.value,
                      })
                    }
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <span className="ml-2">In-person</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="appointmentType"
                    value="telemedicine"
                    checked={formData.appointmentType === "telemedicine"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        appointmentType: e.target.value,
                      })
                    }
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2">Telemedicine</span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Method*
              </label>
              <select
                id="paymentMethod"
                required
                placeholder="Select Payment Method"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base font-medium text-slate-800 placeholder:font-normal placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData({ ...formData, paymentMethod: e.target.value })
                }
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="insurance">Insurance</option>
                <option value="mobile-banking">Mobile Banking</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h4 className="mb-4 text-lg font-medium">Additional Information</h4>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="symptoms"
                className="block text-sm font-medium text-gray-700"
              >
                Symptoms/Reason for Visit
              </label>
              <textarea
                id="symptoms"
                rows={3}
                placeholder="Enter Symptoms/Reason for Visit"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base font-medium text-slate-800 placeholder:font-normal placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.symptoms}
                onChange={(e) =>
                  setFormData({ ...formData, symptoms: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="emergencyContact"
                className="block text-sm font-medium text-gray-700"
              >
                Emergency Contact
              </label>
              <input
                type="tel"
                id="emergencyContact"
                placeholder="Enter Emergency Contact"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base font-medium text-slate-800 placeholder:font-normal placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.emergencyContact}
                onChange={(e) =>
                  setFormData({ ...formData, emergencyContact: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Appointment
          </button>
        </div>
      </form>
    </Drawer>
  );
}

export default AppointmentDrawer;
