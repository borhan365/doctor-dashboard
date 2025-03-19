import { Education, EducationFormData } from "@/types/educations";
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";

interface DynamicFieldsProps {
  formData: EducationFormData;
  updateEducationField: (
    index: number,
    field: keyof Education,
    value: any,
  ) => void;
  toggleExpand: (index: number) => void;
  removeEducation: (index: number) => void;
  addEducation: () => void;
}

function DynamicFields({
  formData,
  updateEducationField,
  toggleExpand,
  removeEducation,
  addEducation,
}: DynamicFieldsProps) {
  if (!formData.doctorId || !formData.educations.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Total Entries:{" "}
          <span className="font-bold text-blue-500">
            {formData?.educations?.length}
          </span>
        </p>
      </div>

      <div className="space-y-4">
        {formData?.educations?.map((education, index) => (
          <div
            key={education.id}
            className={`rounded-lg border p-4 ${
              education.isExpanded ? "border-blue-300" : "border-slate-200"
            }`}
          >
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex flex-1 items-center gap-2">
                <span className="text-slate-500">
                  {education.isExpanded ? <ChevronUp /> : <ChevronDown />}
                </span>
                <div className="flex-1">
                  <span className="font-medium">
                    {education.instituteName || `Education #${index + 1}`}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeEducation(index);
                }}
                className="rounded p-1 text-red-500 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            {education.isExpanded && (
              <div className="mt-4 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Institute Name
                    </label>
                    <input
                      type="text"
                      value={education.instituteName}
                      onChange={(e) =>
                        updateEducationField(
                          index,
                          "instituteName",
                          e.target.value,
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-slate-200 p-2"
                      placeholder="Enter institute name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Year of Completion
                    </label>
                    <input
                      type="number"
                      value={education.yearOfCompletion}
                      onChange={(e) =>
                        updateEducationField(
                          index,
                          "yearOfCompletion",
                          parseInt(e.target.value),
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-slate-200 p-2"
                      placeholder="Enter completion year"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Degree Type
                    </label>
                    <input
                      type="text"
                      value={education.degreeType}
                      onChange={(e) =>
                        updateEducationField(
                          index,
                          "degreeType",
                          e.target.value,
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-slate-200 p-2"
                      placeholder="Enter degree type"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Specialization
                    </label>
                    <input
                      type="text"
                      value={education.specialization}
                      onChange={(e) =>
                        updateEducationField(
                          index,
                          "specialization",
                          e.target.value,
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-slate-200 p-2"
                      placeholder="Enter specialization"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Country
                  </label>
                  <input
                    type="text"
                    value={education.country}
                    onChange={(e) =>
                      updateEducationField(index, "country", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border border-slate-200 p-2"
                    placeholder="Enter country"
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={addEducation}
            className="flex items-center gap-1 rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-500 hover:bg-blue-100"
          >
            <Plus size={18} />
            <span>Add Another Education</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DynamicFields;
