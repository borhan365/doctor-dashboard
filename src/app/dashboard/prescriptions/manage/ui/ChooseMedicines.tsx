function ChooseMedicines({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: any;
}) {
  const scheduleOptions = [
    "1-0-0",
    "0-1-0",
    "0-0-1",
    "1-0-1",
    "1-1-0",
    "0-1-1",
    "1-1-1",
  ];
  const mealTimeOptions = ["Before", "After"];
  const durationTypeOptions = ["Days", "Months", "Years"];

  const handleMedicationChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const newMedications = [...formData.medications];
    newMedications[index] = {
      ...newMedications[index],
      [field]: value,
    };
    setFormData({ ...formData, medications: newMedications });
  };

  const addNewMedication = () => {
    setFormData({
      ...formData,
      medications: [
        ...formData.medications,
        {
          medicine: "",
          schedule: "1-0-1",
          mealTime: "Before",
          duration: "1",
          durationType: "Days",
          remarks: "",
        },
      ],
    });
  };

  const removeMedication = (index: number) => {
    const newMedications = formData?.medications?.filter(
      (_: any, i: number) => i !== index,
    );
    setFormData({ ...formData, medications: newMedications });
  };

  return (
    <>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <label className="block font-medium text-slate-700">
            Medications:
          </label>
          <button
            onClick={addNewMedication}
            className="rounded-md bg-purple-600 px-3 py-1 text-white hover:bg-purple-700"
          >
            Add Medicine
          </button>
        </div>
        <div className="max-h-[300px] space-y-4 overflow-y-auto">
          {formData?.medications?.map((med: any, index: number) => (
            <div
              key={index}
              className="relative rounded-lg border border-slate-200 p-3"
            >
              <button
                onClick={() => removeMedication(index)}
                className="absolute right-2 top-2 text-slate-500 hover:text-slate-700"
              >
                ×
              </button>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Medicine name"
                  className="w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={med.medicine}
                  onChange={(e) =>
                    handleMedicationChange(index, "medicine", e.target.value)
                  }
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    className="rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={med.schedule}
                    onChange={(e) =>
                      handleMedicationChange(index, "schedule", e.target.value)
                    }
                  >
                    {scheduleOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <select
                    className="rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={med.mealTime}
                    onChange={(e) =>
                      handleMedicationChange(index, "mealTime", e.target.value)
                    }
                  >
                    {mealTimeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    placeholder="Duration"
                    className="rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={med.duration}
                    onChange={(e) =>
                      handleMedicationChange(index, "duration", e.target.value)
                    }
                  />
                  <select
                    className="rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={med.durationType}
                    onChange={(e) =>
                      handleMedicationChange(
                        index,
                        "durationType",
                        e.target.value,
                      )
                    }
                  >
                    {durationTypeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Remarks"
                  className="w-full rounded-md border border-slate-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={med.remarks}
                  onChange={(e) =>
                    handleMedicationChange(index, "remarks", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ChooseMedicines;
