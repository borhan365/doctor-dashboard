interface PatientVitalSignsProps {
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const PatientVitalSigns = ({
  formData,
  handleInputChange,
}: PatientVitalSignsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Blood Pressure
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Systolic/Diastolic in mmHg)
            </span>
          </span>
        </label>
        <input
          type="text"
          name="bloodPressure"
          value={formData.bloodPressure}
          onChange={handleInputChange}
          placeholder="e.g., 120/80"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Heart Rate
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Beats per minute - BPM)
            </span>
          </span>
        </label>
        <input
          type="number"
          name="heartRate"
          value={formData.heartRate}
          onChange={handleInputChange}
          placeholder="e.g., 72"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Respiratory Rate
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Breaths per minute)
            </span>
          </span>
        </label>
        <input
          type="number"
          name="respiratoryRate"
          value={formData.respiratoryRate}
          onChange={handleInputChange}
          placeholder="e.g., 16"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Temperature
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Body temperature in °C)
            </span>
          </span>
        </label>
        <input
          type="number"
          name="temperature"
          value={formData.temperature}
          onChange={handleInputChange}
          placeholder="e.g., 37.0"
          step="0.1"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Blood Sugar
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Blood glucose level in mg/dL)
            </span>
          </span>
        </label>
        <input
          type="text"
          name="bloodSugar"
          value={formData.bloodSugar}
          onChange={handleInputChange}
          placeholder="e.g., 100 mg/dL"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Oxygen Saturation
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (SpO2 percentage)
            </span>
          </span>
        </label>
        <input
          type="number"
          name="oxygenSaturation"
          value={formData.oxygenSaturation}
          onChange={handleInputChange}
          placeholder="e.g., 98"
          min="0"
          max="100"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div className="col-span-full">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Medical Notes
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Additional observations or concerns about vital signs)
            </span>
          </span>
        </label>
        <textarea
          name="medicalNotes"
          value={formData.medicalNotes}
          onChange={handleInputChange}
          rows={4}
          placeholder="e.g., Patient shows elevated blood pressure, recommend follow-up in 2 weeks"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>
    </div>
  );
};

export default PatientVitalSigns;
