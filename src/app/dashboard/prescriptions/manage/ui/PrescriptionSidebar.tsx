import ChooseDiagnostics from "./ChooseDiagnostics";
import ChooseMedicines from "./ChooseMedicines";
import ChoosePatient from "./ChoosePatient";

function PrescriptionSidebar({
  patientInfo,
  setPatientInfo,
  formData,
  setFormData,
}: {
  patientInfo: any;
  setPatientInfo: any;
  formData: any;
  setFormData: any;
}) {
  
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <>
      <div className="w-1/3 space-y-4 bg-white p-4 shadow-lg">
        <h2 className="text-lg font-semibold text-purple-600">
          Prescription Details
        </h2>

        {/* choose patient */}
        <ChoosePatient />

        {/* Patient Info */}
        <div className="space-y-3">
          <div>
            <label className="block font-medium text-slate-700">Name:</label>
            <input
              type="text"
              value={patientInfo.name}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, name: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Patient Name"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700">Age:</label>
            <input
              type="text"
              value={patientInfo.age}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, age: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Age"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700">Date:</label>
            <input
              type="date"
              value={patientInfo.date}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, date: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Diagnosis */}
        <div>
          <label className="block font-medium text-slate-700">Diagnosis:</label>
          <textarea
            className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            rows={2}
            placeholder="Enter diagnosis"
            value={formData.diagnosis}
            onChange={(e) =>
              setFormData({ ...formData, diagnosis: e.target.value })
            }
          />
        </div>

        {/* Clinical Complaints */}
        <div>
          <label className="block font-medium text-slate-700">
            Clinical Complaints:
          </label>
          <textarea
            className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            rows={4}
            placeholder="Enter clinical complaints"
            value={formData.complaints}
            onChange={(e) =>
              setFormData({ ...formData, complaints: e.target.value })
            }
          />
        </div>

        {/* Risk Factors */}
        <div className="space-y-2">
          <label className="block font-medium text-slate-700">
            Risk Factors:
          </label>
          {["O/E", "Pulse", "BP", "Heart", "Lung", "Others"].map((label) => (
            <div key={label} className="flex items-center gap-2">
              <span className="w-16 text-slate-600">{label}:</span>
              <input
                type="text"
                className="w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder={`Enter ${label.toLowerCase()}`}
                value={
                  formData.riskFactors[
                    label.toLowerCase() as keyof typeof formData.riskFactors
                  ]
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    riskFactors: {
                      ...formData.riskFactors,
                      [label.toLowerCase()]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>

        {/* Investigations */}
        <ChooseDiagnostics formData={formData} setFormData={setFormData} />

        {/* Medications */}
        <ChooseMedicines formData={formData} setFormData={setFormData} />
        
        {/* Doctor's Notes */}
        <div>
          <label className="block font-medium text-slate-700">
            {`Doctor's Notes:`}
          </label>
          <textarea
            className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            rows={4}
            placeholder="Add any additional notes here..."
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex-1 rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Download
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Print
          </button>
        </div>
      </div>
    </>
  );
}

export default PrescriptionSidebar;
