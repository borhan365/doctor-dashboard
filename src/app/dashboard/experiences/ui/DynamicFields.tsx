import { Experience, ExperienceFormData } from "@/types/experiences";
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";

interface DynamicFieldsProps {
  formData: ExperienceFormData;
  updateExperienceField: (
    index: number,
    field: keyof Experience,
    value: any,
  ) => void;
  toggleExpand: (index: number) => void;
  removeExperience: (index: number) => void;
  addExperience: () => void;
}

function DynamicFields({
  formData,
  updateExperienceField,
  toggleExpand,
  removeExperience,
  addExperience,
}: DynamicFieldsProps) {
  if (!formData.doctorId || !formData.experiences.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Total Entries:{" "}
          <span className="font-bold text-blue-500">
            {formData?.experiences?.length}
          </span>
        </p>
      </div>

      <div className="space-y-4">
        {formData?.experiences?.map((experience, index) => (
          <div
            key={index}
            className={`rounded-lg border p-4 ${
              experience.isExpanded ? "border-blue-300" : "border-slate-200"
            }`}
          >
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex flex-1 items-center gap-2">
                <span className="text-slate-500">
                  {experience.isExpanded ? <ChevronUp /> : <ChevronDown />}
                </span>
                <div className="flex-1">
                  <span className="font-medium">
                    {experience.hospitalName || `Experience #${index + 1}`}
                  </span>
                  {experience.designation && (
                    <span className="ml-2 text-sm text-slate-500">
                      {experience.designation}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeExperience(index);
                }}
                className="rounded p-1 text-red-500 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            {experience.isExpanded && (
              <div className="mt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Hospital/Organization Name
                    </label>
                    <input
                      type="text"
                      value={experience.hospitalName}
                      onChange={(e) =>
                        updateExperienceField(
                          index,
                          "hospitalName",
                          e.target.value,
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-slate-200 p-2"
                      placeholder="Enter hospital or organization name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Designation
                    </label>
                    <input
                      type="text"
                      value={experience.designation}
                      onChange={(e) =>
                        updateExperienceField(
                          index,
                          "designation",
                          e.target.value,
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-slate-200 p-2"
                      placeholder="Enter your job title"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Department
                  </label>
                  <input
                    type="text"
                    value={experience.department}
                    onChange={(e) =>
                      updateExperienceField(index, "department", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border border-slate-200 p-2"
                    placeholder="Enter department name"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={
                        typeof experience.startDate === "string"
                          ? experience.startDate
                          : experience.startDate instanceof Date
                            ? experience.startDate.toISOString().split("T")[0]
                            : ""
                      }
                      onChange={(e) =>
                        updateExperienceField(
                          index,
                          "startDate",
                          e.target.value,
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-slate-200 p-2"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-slate-700">
                        End Date
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`current-${index}`}
                          checked={experience.isCurrent || false}
                          onChange={(e) =>
                            updateExperienceField(
                              index,
                              "isCurrent",
                              e.target.checked,
                            )
                          }
                          className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600"
                        />
                        <label
                          htmlFor={`current-${index}`}
                          className="text-xs text-slate-600"
                        >
                          Current Job
                        </label>
                      </div>
                    </div>
                    <input
                      type="date"
                      value={
                        !experience.isCurrent && experience.endDate
                          ? typeof experience.endDate === "string"
                            ? experience.endDate
                            : experience.endDate instanceof Date
                              ? experience.endDate.toISOString().split("T")[0]
                              : ""
                          : ""
                      }
                      onChange={(e) =>
                        updateExperienceField(index, "endDate", e.target.value)
                      }
                      disabled={experience.isCurrent || false}
                      className="mt-1 block w-full rounded-md border border-slate-200 p-2 disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Description
                  </label>
                  <textarea
                    value={experience.description || ""}
                    onChange={(e) =>
                      updateExperienceField(
                        index,
                        "description",
                        e.target.value,
                      )
                    }
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-slate-200 p-2"
                    placeholder="Describe your responsibilities and achievements"
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={addExperience}
            className="flex items-center gap-1 rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-500 hover:bg-blue-100"
          >
            <Plus size={18} />
            <span>Add Another Experience</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DynamicFields;
