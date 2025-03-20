interface PatientLifestyleProps {
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const PatientLifestyle = ({
  formData,
  handleInputChange,
}: PatientLifestyleProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Dietary Restrictions
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Special dietary needs or preferences)
            </span>
          </span>
        </label>
        <input
          type="text"
          name="dietaryRestrictions"
          value={formData.dietaryRestrictions}
          onChange={handleInputChange}
          placeholder="e.g., Vegetarian, Gluten-free, Dairy-free"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Exercise Routine
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Regular physical activities and frequency)
            </span>
          </span>
        </label>
        <input
          type="text"
          name="exerciseRoutine"
          value={formData.exerciseRoutine}
          onChange={handleInputChange}
          placeholder="e.g., 30 mins walking daily, gym 3x/week"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Smoking Status
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Current smoking habits)
            </span>
          </span>
        </label>
        <select
          name="smokingStatus"
          value={formData.smokingStatus}
          onChange={handleInputChange}
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        >
          <option value="">Select Status</option>
          <option value="Never">Never Smoked</option>
          <option value="Former">Former Smoker</option>
          <option value="Current">Current Smoker</option>
        </select>
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Alcohol Consumption
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Frequency of alcohol intake)
            </span>
          </span>
        </label>
        <select
          name="alcoholConsumption"
          value={formData.alcoholConsumption}
          onChange={handleInputChange}
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        >
          <option value="">Select Consumption</option>
          <option value="None">None</option>
          <option value="Occasional">Occasional (1-2 drinks/week)</option>
          <option value="Moderate">Moderate (3-7 drinks/week)</option>
          <option value="Regular">Regular (>7 drinks/week)</option>
        </select>
      </div>

      <div className="col-span-full">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Sleep Pattern
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Average sleep duration and quality)
            </span>
          </span>
        </label>
        <textarea
          name="sleepPattern"
          value={formData.sleepPattern}
          onChange={handleInputChange}
          rows={3}
          placeholder="e.g., 7-8 hours/night, occasional insomnia"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>
    </div>
  );
};

export default PatientLifestyle;
