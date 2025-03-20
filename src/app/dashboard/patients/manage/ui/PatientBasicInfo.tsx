interface PatientBasicInfoProps {
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const PatientBasicInfo = ({
  formData,
  handleInputChange,
}: PatientBasicInfoProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Name
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Enter patient&apos;s full legal name as it appears on official
              documents)
            </span>
          </span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="e.g., John Michael Doe"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-base
                     font-medium text-slate-800 placeholder:font-normal 
                     placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Email
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Primary contact email for medical communications)
            </span>
          </span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="e.g., john.doe@example.com"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Phone
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Primary contact number with country code)
            </span>
          </span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="e.g., +1 (555) 123-4567"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Date of Birth
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Patient&apos;s birth date for age calculation)
            </span>
          </span>
        </label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
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
            Gender
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Patient&apos;s gender identity)
            </span>
          </span>
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Emergency Contact
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Name of emergency contact person)
            </span>
          </span>
        </label>
        <input
          type="text"
          name="emergencyContact"
          value={formData.emergencyContact}
          onChange={handleInputChange}
          placeholder="e.g., Jane Doe"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Emergency Phone
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Emergency contact&apos;s phone number)
            </span>
          </span>
        </label>
        <input
          type="tel"
          name="emergencyPhone"
          value={formData.emergencyPhone}
          onChange={handleInputChange}
          placeholder="e.g., +1 (555) 987-6543"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Relation to Emergency Contact
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Relationship with emergency contact)
            </span>
          </span>
        </label>
        <input
          type="text"
          name="relationToEmergencyContact"
          value={formData.relationToEmergencyContact}
          onChange={handleInputChange}
          placeholder="e.g., Spouse, Parent, Sibling"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      {/* Address Information */}
      <div className="col-span-full">
        <h3 className="mb-0 text-lg font-medium text-slate-900 dark:text-slate-100">
          Address Information
        </h3>
      </div>

      <div className="col-span-full">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Address
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Complete street address)
            </span>
          </span>
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="e.g., 123 Main Street, Apt 4B"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            City
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (City/Town name)
            </span>
          </span>
        </label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="e.g., New York"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            State
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (State/Province)
            </span>
          </span>
        </label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          placeholder="e.g., New York"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Postal Code
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (ZIP/Postal code)
            </span>
          </span>
        </label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleInputChange}
          placeholder="e.g., 10001"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Country
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Country name)
            </span>
          </span>
        </label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          placeholder="e.g., United States"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>
    </div>
  );
};

export default PatientBasicInfo;
