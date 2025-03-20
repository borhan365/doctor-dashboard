interface PatientDocumentsProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PatientDocuments = ({
  formData,
  handleInputChange,
}: PatientDocumentsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div>
        <h3 className="mb-4 text-lg font-medium text-slate-900 dark:text-slate-100">
          Medical Documents
        </h3>
        <div className="rounded-lg border-2 border-dashed border-slate-300 p-6 dark:border-slate-600">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div className="mt-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Upload Medical Documents
                  <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
                    (Test reports, prescriptions, etc.)
                  </span>
                </span>
              </label>
              <input
                type="file"
                name="medicalDocuments"
                onChange={handleInputChange}
                className="mt-2 block w-full text-sm text-slate-500 file:mr-4
                  file:rounded-md file:border-0 file:bg-blue-50
                  file:px-4 file:py-2 file:text-sm
                  file:font-medium file:text-blue-700 hover:file:bg-blue-100
                  dark:text-slate-400
                  dark:file:bg-slate-700 dark:file:text-slate-200
                  dark:hover:file:bg-slate-600"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium text-slate-900 dark:text-slate-100">
          Consent Forms
        </h3>
        <div className="rounded-lg border-2 border-dashed border-slate-300 p-6 dark:border-slate-600">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <div className="mt-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Upload Consent Forms
                  <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
                    (Treatment consent, privacy forms, etc.)
                  </span>
                </span>
              </label>
              <input
                type="file"
                name="consentForms"
                onChange={handleInputChange}
                className="mt-2 block w-full text-sm text-slate-500 file:mr-4
                  file:rounded-md file:border-0 file:bg-blue-50
                  file:px-4 file:py-2 file:text-sm
                  file:font-medium file:text-blue-700 hover:file:bg-blue-100
                  dark:text-slate-400
                  dark:file:bg-slate-700 dark:file:text-slate-200
                  dark:hover:file:bg-slate-600"
                multiple
                accept=".pdf"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDocuments;
