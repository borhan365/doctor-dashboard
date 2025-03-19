import { DoctorFormData } from "@/types/doctors";
import { Checkbox } from "antd";
import { ChevronDown, CircleAlert } from "lucide-react";
import { useState } from "react";

// Temporary closed
// tempClosed Json?
// Expected fields are:
// isClosed Boolean @default(false)
// closedReason String?
// bnClosedReason String?
// closedStartDate DateTime?
// closedEndDate DateTime?
// closedDetails String?
// bnClosedDetails String?

interface TempClosedProps {
  formData: DoctorFormData;
  onChange: (field: keyof DoctorFormData, value: any) => void;
}

function TempClosed({ formData, onChange }: TempClosedProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const tempClosed = {
    isClosed: formData.tempClosed?.isClosed || false,
    closedReason: formData.tempClosed?.closedReason || "",
    bnClosedReason: formData.tempClosed?.bnClosedReason || "",
    closedStartDate: formData.tempClosed?.closedStartDate || "",
    closedEndDate: formData.tempClosed?.closedEndDate || "",
    closedDetails: formData.tempClosed?.closedDetails || "",
    bnClosedDetails: formData.tempClosed?.bnClosedDetails || "",
  };

  const handleChange = (field: string, value: any) => {
    onChange("tempClosed", {
      ...formData.tempClosed,
      [field]: value,
    });
  };

  return (
    <>
      <div className="rounded-md border border-red-100">
        {/* Clickable header */}
        <div
          className="flex cursor-pointer items-center justify-between p-4"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div>
            <h2 className="text-lg font-bold text-red-900">
              Temporarily close my chamber
            </h2>
            <p className="text-sm text-gray-700">
              Click to manage temporary closure of your chamber
            </p>
          </div>
          <ChevronDown
            className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          />
        </div>

        {/* Expandable content */}
        {isExpanded && (
          <div className="border-t border-red-100 p-4">
            <p className="mb-4 text-sm text-gray-700">
              If the doctor is currently on vacation, pursuing a higher degree
              abroad, or unavailable for any other reason, please select the
              reason and provide details for your patients. Your chamber will
              remain closed until the end date you specify, ensuring your
              patients are properly notified.
            </p>

            <div className="flex flex-col gap-2">
              {/* isClosed */}
              <div className="flex items-center justify-start gap-2">
                <Checkbox
                  id="isClosed"
                  checked={tempClosed.isClosed}
                  onChange={(e) => handleChange("isClosed", e.target.checked)}
                />
                <label
                  htmlFor="isClosed"
                  className="cursor-pointer text-sm text-gray-700"
                >
                  Want to temporarily close your chamber?
                </label>
              </div>

              {/* Reason */}
              <div>
                <label htmlFor="reason" className="text-sm text-gray-700">
                  Reason title
                </label>
                <input
                  type="text"
                  id="reason"
                  placeholder="Reason title"
                  value={tempClosed.closedReason}
                  onChange={(e) => handleChange("closedReason", e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 p-2 text-base font-medium text-gray-800 placeholder:text-gray-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Start Date */}
                <div>
                  <label htmlFor="startDate" className="text-sm text-gray-700">
                    Start Date (From)
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={tempClosed.closedStartDate}
                    onChange={(e) =>
                      handleChange("closedStartDate", e.target.value)
                    }
                    className="mt-2 w-full rounded-md border border-gray-300 p-2 text-base font-medium text-gray-800 placeholder:text-gray-500"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label htmlFor="endDate" className="text-sm text-gray-700">
                    End Date (To)
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={tempClosed.closedEndDate}
                    onChange={(e) =>
                      handleChange("closedEndDate", e.target.value)
                    }
                    className="mt-2 w-full rounded-md border border-gray-300 p-2 text-base font-medium text-gray-800 placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Details */}
              <div>
                <label htmlFor="details" className="text-sm text-gray-700">
                  Complete Details
                </label>
                <textarea
                  id="details"
                  placeholder="Explain the reason for closing the chamber"
                  value={tempClosed.closedDetails}
                  onChange={(e) =>
                    handleChange("closedDetails", e.target.value)
                  }
                  className="mt-2 w-full rounded-md border border-gray-300 p-2 text-base font-medium text-gray-800 placeholder:text-gray-500"
                />
              </div>

              {/* Note for doctor */}
              <div className="flex items-center gap-2 rounded-md bg-green-100 p-2">
                <CircleAlert className="text-green-500" />
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Note for the doctor:</span>{" "}
                  After closing your chamber, you will not be able to receive
                  any new appointment requests until your{" "}
                  <span className="font-medium">End date</span> has passed.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TempClosed;
