import { DoctorExperience } from "@/types/experiences";
import { Edit, Trash2 } from "lucide-react";
import moment from "moment";

interface TableProps {
  currentExperiences: any[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  isDeleting: boolean;
}

function Table({
  currentExperiences,
  handleDelete,
  handleEdit,
  isDeleting,
}: TableProps) {
  // Flatten the experiences array from the groups
  const experiences = currentExperiences.reduce<DoctorExperience[]>(
    (acc, group) => [...acc, ...group.experiences],
    [],
  );

  return (
    <div className="rounded-md p-6 border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
      {/* Mobile View */}
      <div className="block md:hidden">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="border-b border-stroke p-4 dark:border-strokedark"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium text-black dark:text-white">
                {exp.hospitalName}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(exp.id)}
                  className="hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                  title="Edit experience record"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="hover:text-danger text-red-500 dark:text-gray-300 dark:hover:text-danger"
                  disabled={isDeleting}
                  title="Delete experience record"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-gray-600 dark:text-gray-300">
                {exp.designation} • {exp.department}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {moment(exp.startDate).format("MMM YYYY")} -{" "}
                {exp.isCurrent
                  ? "Present"
                  : moment(exp.endDate).format("MMM YYYY")}
              </p>
              {exp.description && (
                <p className="mt-2 line-clamp-2 text-gray-500 dark:text-gray-400">
                  {exp.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[250px] px-4 py-4 font-medium text-black dark:text-white">
                  Hospital/Organization
                </th>
                <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                  Position
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Duration
                </th>
                <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp) => (
                <tr
                  key={exp.id}
                  className="border-b border-[#eee] hover:bg-gray-50 dark:border-strokedark dark:hover:bg-meta-4"
                >
                  <td className="px-4 py-5">
                    <div>
                      <h5 className="font-medium text-black dark:text-white">
                        {exp.hospitalName}
                      </h5>
                      {exp.description && (
                        <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="text-black dark:text-white">
                      {exp.designation}
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {exp.department}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-black dark:text-white">
                    <div className="text-sm">
                      {moment(exp.startDate).format("MMM YYYY")} -{" "}
                      {exp.isCurrent ? (
                        <span className="text-success">Present</span>
                      ) : (
                        moment(exp.endDate).format("MMM YYYY")
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => handleEdit(exp.id)}
                        className="hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                        title="Edit experience record"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="hover:text-danger dark:text-gray-300 dark:hover:text-danger"
                        disabled={isDeleting}
                        title="Delete experience record"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
