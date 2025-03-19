import { DoctorEducation } from "@/types/educations";
import { Edit, Trash2 } from "lucide-react";

interface TableProps {
  currentEducations: any[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  isDeleting: boolean;
}

function Table({
  currentEducations,
  handleDelete,
  handleEdit,
  isDeleting,
}: TableProps) {
  // Flatten the educations array from the groups
  const educations = currentEducations.reduce<DoctorEducation[]>(
    (acc, group) => [...acc, ...group.educations],
    [],
  );

  return (
    <div className="rounded-md border border-stroke bg-white p-6 dark:border-strokedark dark:bg-boxdark">
      {/* Mobile View */}
      <div className="block md:hidden">
        {educations.map((edu) => (
          <div
            key={edu.id}
            className="border-b border-stroke p-4 dark:border-strokedark"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium text-black dark:text-white">
                {edu.instituteName}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(edu.id)}
                  className="hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                  title="Edit education record"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(edu.id)}
                  className="text-red-500 hover:text-danger dark:text-gray-300 dark:hover:text-danger"
                  disabled={isDeleting}
                  title="Delete education record"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-gray-600 dark:text-gray-300">
                {edu.degreeType} • {edu.specialization}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Completed in {edu.yearOfCompletion}
                {edu.country && ` • ${edu.country}`}
              </p>
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
                  Institution
                </th>
                <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                  Degree
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Year
                </th>
                <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {educations.map((edu) => (
                <tr
                  key={edu.id}
                  className="border-b border-[#eee] hover:bg-gray-50 dark:border-strokedark dark:hover:bg-meta-4"
                >
                  <td className="px-4 py-5">
                    <div>
                      <h5 className="font-medium text-black dark:text-white">
                        {edu.instituteName}
                      </h5>
                      {edu.country && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {edu.country}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="text-black dark:text-white">
                      {edu.degreeType}
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {edu.specialization}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-black dark:text-white">
                    <div className="text-sm">{edu.yearOfCompletion}</div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => handleEdit(edu.id)}
                        className="hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                        title="Edit education record"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(edu.id)}
                        className="hover:text-danger dark:text-gray-300 dark:hover:text-danger"
                        disabled={isDeleting}
                        title="Delete education record"
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
