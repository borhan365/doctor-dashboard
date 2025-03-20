import { X } from "lucide-react";

function ChooseDiagnostics({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: any;
}) {
  const commonInvestigations = [
    "ECG",
    "CXR (P/A)",
    "RBS",
    "Echo 2D/Doppler",
    "S. TSH",
    "S. creatine",
    "CBC",
    "FBS",
    "2HABF",
    "HbA1C",
  ];

  const handleInvestigationSelect = (investigation: string) => {
    if (!formData?.selectedInvestigations?.includes(investigation as never)) {
      setFormData({
        ...formData,
        selectedInvestigations: [
          ...formData?.selectedInvestigations,
          investigation as never,
        ],
      });
    }
  };

  const removeInvestigation = (investigation: string) => {
    setFormData({
      ...formData,
      selectedInvestigations: formData?.selectedInvestigations?.filter(
        (i: string) => i !== investigation,
      ),
    });
  };

  const addCustomInvestigation = () => {
    if (formData?.customInvestigations.trim()) {
      setFormData({
        ...formData,
        selectedInvestigations: [
          ...formData?.selectedInvestigations,
          formData?.customInvestigations.trim() as never,
        ],
        customInvestigations: "",
      });
    }
  };

  return (
    <>
      <div className="space-y-4">
        <label className="block font-medium text-slate-700">
          Investigations:
        </label>
        <div className="flex flex-wrap gap-2">
          <select
            className="rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            onChange={(e) => handleInvestigationSelect(e.target.value)}
            value=""
          >
            <option value="">Select Investigation</option>
            {commonInvestigations.map((inv) => (
              <option key={inv} value={inv}>
                {inv}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add custom investigation"
              className="rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={formData?.customInvestigations}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customInvestigations: e.target.value,
                })
              }
            />
            <button
              onClick={addCustomInvestigation}
              className="rounded-md bg-purple-600 px-3 py-1 text-white hover:bg-purple-700"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData?.selectedInvestigations?.map(
            (inv: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1"
              >
                <span>{inv}</span>
                <button
                  onClick={() => removeInvestigation(inv)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
}

export default ChooseDiagnostics;
