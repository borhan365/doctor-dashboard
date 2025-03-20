interface PatientMedicalDetailsProps {
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const bloodGroupOptions = [
  { value: "A_POSITIVE", label: "A+" },
  { value: "A_NEGATIVE", label: "A-" },
  { value: "B_POSITIVE", label: "B+" },
  { value: "B_NEGATIVE", label: "B-" },
  { value: "O_POSITIVE", label: "O+" },
  { value: "O_NEGATIVE", label: "O-" },
  { value: "AB_POSITIVE", label: "AB+" },
  { value: "AB_NEGATIVE", label: "AB-" },
];

const maritalStatusOptions = [
  { value: "SINGLE", label: "Single" },
  { value: "MARRIED", label: "Married" },
  { value: "DIVORCED", label: "Divorced" },
  { value: "WIDOWED", label: "Widowed" },
];

const PatientMedicalDetails = ({
  formData,
  handleInputChange,
}: PatientMedicalDetailsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Height
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Patient&apos;s height in centimeters)
            </span>
          </span>
        </label>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleInputChange}
          placeholder="e.g., 175"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Weight
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Patient&apos;s weight in kilograms)
            </span>
          </span>
        </label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          placeholder="e.g., 70"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            BMI
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Body Mass Index - auto-calculated from height and weight)
            </span>
          </span>
        </label>
        <input
          type="number"
          name="bmi"
          value={formData.bmi}
          onChange={handleInputChange}
          placeholder="e.g., 22.5"
          step="0.01"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Blood Group
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Patient&apos;s blood type)
            </span>
          </span>
        </label>
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleInputChange}
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        >
          <option value="">Select Blood Group</option>
          {bloodGroupOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Marital Status
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Patient&apos;s current marital status)
            </span>
          </span>
        </label>
        <select
          name="maritalStatus"
          value={formData.maritalStatus}
          onChange={handleInputChange}
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        >
          <option value="">Select Marital Status</option>
          {maritalStatusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            NID Number
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (National ID card number)
            </span>
          </span>
        </label>
        <input
          type="text"
          name="NIDNumber"
          value={formData.NIDNumber}
          onChange={handleInputChange}
          placeholder="e.g., 1234-5678-9012"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Passport Number
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (International passport number if available)
            </span>
          </span>
        </label>
        <input
          type="text"
          name="passportNumber"
          value={formData.passportNumber}
          onChange={handleInputChange}
          placeholder="e.g., AB1234567"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Anniversary Date
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Marriage anniversary date if applicable)
            </span>
          </span>
        </label>
        <input
          type="date"
          name="anniversaryDate"
          value={formData.anniversaryDate}
          onChange={handleInputChange}
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Referred By
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Name of referring doctor or person)
            </span>
          </span>
        </label>
        <input
          type="text"
          name="refferalBy"
          value={formData.refferalBy}
          onChange={handleInputChange}
          placeholder="e.g., Dr. Jane Smith"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      {/* Insurance Information Section */}
      <div className="col-span-full">
        <h3 className="mb-4 text-lg font-medium text-slate-900 dark:text-slate-100">
          Insurance Information
        </h3>
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Insurance Provider
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Name of insurance company)
            </span>
          </span>
        </label>
        <input
          type="text"
          name="insuranceProvider"
          value={formData.insuranceProvider}
          onChange={handleInputChange}
          placeholder="e.g., Blue Cross Blue Shield"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Policy Number
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Insurance policy number)
            </span>
          </span>
        </label>
        <input
          type="text"
          name="insurancePolicyNumber"
          value={formData.insurancePolicyNumber}
          onChange={handleInputChange}
          placeholder="e.g., POL-123456789"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Expiry Date
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Insurance policy expiry date)
            </span>
          </span>
        </label>
        <input
          type="date"
          name="insuranceExpiryDate"
          value={formData.insuranceExpiryDate}
          onChange={handleInputChange}
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>
    </div>
  );
};

export default PatientMedicalDetails;
