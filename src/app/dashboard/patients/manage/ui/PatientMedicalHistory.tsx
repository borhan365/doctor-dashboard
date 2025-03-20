interface PatientMedicalHistoryProps {
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleArrayInput: (name: string, values: string[]) => void;
}

const PatientMedicalHistory = ({
  formData,
  handleInputChange,
  handleArrayInput,
}: PatientMedicalHistoryProps) => {
  const handleArrayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const arrayValues = value.split("\n").filter((item) => item.trim() !== "");
    handleArrayInput(name, arrayValues);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="col-span-full">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Initial Diseases
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (List all pre-existing conditions at first visit - one per line)
            </span>
          </span>
        </label>
        <textarea
          name="initialDiseases"
          value={formData.initialDiseases.join("\n")}
          onChange={handleArrayChange}
          rows={4}
          placeholder="e.g.,&#10;Diabetes Type 2&#10;Hypertension&#10;Asthma"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div className="col-span-full">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Current Diseases
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (List all current active conditions - one per line)
            </span>
          </span>
        </label>
        <textarea
          name="currentDiseases"
          value={formData.currentDiseases.join("\n")}
          onChange={handleArrayChange}
          rows={4}
          placeholder="e.g.,&#10;High Blood Pressure&#10;Arthritis&#10;GERD"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div className="col-span-full">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Allergies
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (List all known allergies including medications, food, etc. - one
              per line)
            </span>
          </span>
        </label>
        <textarea
          name="allergies"
          value={formData.allergies.join("\n")}
          onChange={handleArrayChange}
          rows={4}
          placeholder="e.g.,&#10;Penicillin&#10;Peanuts&#10;Latex"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div className="col-span-full">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Chronic Conditions
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (List all long-term medical conditions - one per line)
            </span>
          </span>
        </label>
        <textarea
          name="chronicConditions"
          value={formData.chronicConditions.join("\n")}
          onChange={handleArrayChange}
          rows={4}
          placeholder="e.g.,&#10;Diabetes&#10;Heart Disease&#10;Chronic Kidney Disease"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div className="col-span-full">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Previous Surgeries
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (List all past surgical procedures with dates if known - one per
              line)
            </span>
          </span>
        </label>
        <textarea
          name="previousSurgeries"
          value={formData.previousSurgeries.join("\n")}
          onChange={handleArrayChange}
          rows={4}
          placeholder="e.g.,&#10;Appendectomy (2018)&#10;Knee Replacement (2020)&#10;Gallbladder Removal (2021)"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div className="col-span-full">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Family History
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Relevant medical conditions in immediate family members)
            </span>
          </span>
        </label>
        <textarea
          name="familyHistory"
          value={formData.familyHistory}
          onChange={handleInputChange}
          rows={4}
          placeholder="e.g., Father: Diabetes, Heart Disease&#10;Mother: Breast Cancer&#10;Sibling: Hypertension"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Lifestyle
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Daily habits, exercise routine, diet, etc.)
            </span>
          </span>
        </label>
        <textarea
          name="lifestyle"
          value={formData.lifestyle}
          onChange={handleInputChange}
          rows={4}
          placeholder="e.g., Regular exercise 3 times/week&#10;Vegetarian diet&#10;Non-smoker&#10;Moderate alcohol consumption"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Occupation
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Current job and work environment)
            </span>
          </span>
        </label>
        <input
          type="text"
          name="occupation"
          value={formData.occupation}
          onChange={handleInputChange}
          placeholder="e.g., Software Developer (Desk Job)"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>
    </div>
  );
};

export default PatientMedicalHistory;
