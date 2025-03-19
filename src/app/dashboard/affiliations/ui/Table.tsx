import { DoctorAffiliation } from "@/types/affiliations";
import { Edit, Trash2 } from "lucide-react";

interface TableProps {
  currentAffiliations: any[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  isDeleting: boolean;
}

function Table({
  currentAffiliations,
  handleDelete,
  handleEdit,
  isDeleting,
}: TableProps) {
  // Flatten the affiliations array from the groups
  const affiliations = currentAffiliations.reduce<DoctorAffiliation[]>(
    (acc, group) => [...acc, ...group.affiliations],
    [],
  );

  return (
    <div className="rounded-md border border-stroke bg-white p-6 dark:border-strokedark dark:bg-boxdark">
      {/* Mobile View */}
      <div className="block md:hidden">
        {affiliations.map((aff) => (
          <div
            key={aff.id}
            className="border-b border-stroke p-4 dark:border-strokedark"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium text-black dark:text-white">
                {aff.title}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(aff.id!)}
                  className="hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                  title="Edit affiliation"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(aff.id!)}
                  className="text-red-500 hover:text-danger dark:text-gray-300 dark:hover:text-danger"
                  disabled={isDeleting}
                  title="Delete affiliation"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {aff.hospitalName}
              {aff.role && <span className="ml-2">• {aff.role}</span>}
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
                  Title
                </th>
                <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                  Organization
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Role
                </th>
                <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {affiliations.map((aff) => (
                <tr
                  key={aff.id}
                  className="border-b border-[#eee] hover:bg-gray-50 dark:border-strokedark dark:hover:bg-meta-4"
                >
                  <td className="px-4 py-5">
                    <div>
                      <h5 className="font-medium text-black dark:text-white">
                        {aff.title}
                      </h5>
                      {aff.bnTitle && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {aff.bnTitle}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="text-black dark:text-white">
                      {aff.hospitalName}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {aff.role || "-"}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => handleEdit(aff.id!)}
                        className="hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                        title="Edit affiliation"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(aff.id!)}
                        className="hover:text-danger dark:text-gray-300 dark:hover:text-danger"
                        disabled={isDeleting}
                        title="Delete affiliation"
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
