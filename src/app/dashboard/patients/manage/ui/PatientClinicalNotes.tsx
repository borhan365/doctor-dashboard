interface PatientClinicalNotesProps {
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const PatientClinicalNotes = ({
  formData,
  handleInputChange,
}: PatientClinicalNotesProps) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Chief Complaint
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Main symptoms or reason for visit)
            </span>
          </span>
        </label>
        <textarea
          name="chiefComplaint"
          value={formData.chiefComplaint}
          onChange={handleInputChange}
          rows={4}
          placeholder="e.g., Patient presents with severe headache for past 3 days, accompanied by nausea"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Observations
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Physical examination findings and clinical observations)
            </span>
          </span>
        </label>
        <textarea
          name="observations"
          value={formData.observations}
          onChange={handleInputChange}
          rows={4}
          placeholder="e.g., Patient appears distressed, BP elevated at 140/90, tender to palpation in temporal region"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Investigations
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Ordered tests and diagnostic procedures)
            </span>
          </span>
        </label>
        <textarea
          name="investigations"
          value={formData.investigations}
          onChange={handleInputChange}
          rows={4}
          placeholder="e.g., Ordered: CBC, CMP, CT scan of head without contrast"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Diagnosis
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Primary and differential diagnoses)
            </span>
          </span>
        </label>
        <textarea
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleInputChange}
          rows={4}
          placeholder="e.g., Primary: Migraine without aura&#10;Differential: Tension headache, Cluster headache"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Treatment Plan
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Medications, procedures, and recommendations)
            </span>
          </span>
        </label>
        <textarea
          name="treatmentPlan"
          value={formData.treatmentPlan}
          onChange={handleInputChange}
          rows={4}
          placeholder="e.g., 1. Sumatriptan 50mg PRN&#10;2. Avoid triggers&#10;3. Keep headache diary&#10;4. Stress management techniques"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Follow-up Plan
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Next appointment and monitoring instructions)
            </span>
          </span>
        </label>
        <textarea
          name="followUpPlan"
          value={formData.followUpPlan}
          onChange={handleInputChange}
          rows={4}
          placeholder="e.g., Follow-up in 2 weeks&#10;Return sooner if symptoms worsen&#10;Bring headache diary to next visit"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      <div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Additional Notes
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
              (Other relevant information or special instructions)
            </span>
          </span>
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={4}
          placeholder="e.g., Patient education provided about migraine triggers and lifestyle modifications"
          className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 
                     text-slate-700 placeholder:text-slate-400
                     focus:border-transparent focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>
    </div>
  );
};

export default PatientClinicalNotes;
