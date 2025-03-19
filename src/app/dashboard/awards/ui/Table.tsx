import { DoctorAward } from "@/types/awards";
import { Edit, Trash2 } from "lucide-react";

interface TableProps {
  currentAwards: any[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  isDeleting: boolean;
}

function Table({
  currentAwards,
  handleDelete,
  handleEdit,
  isDeleting,
}: TableProps) {
  // Flatten the awards array from the groups
  const awards = currentAwards.reduce<DoctorAward[]>(
    (acc, group) => [...acc, ...group.awards],
    [],
  );

  return (
    <div className="rounded-md border border-stroke bg-white p-6 dark:border-strokedark dark:bg-boxdark">
      {/* Mobile View */}
      <div className="block md:hidden">
        {awards.map((award) => (
          <div
            key={award.id}
            className="border-b border-stroke p-4 dark:border-strokedark"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium text-black dark:text-white">
                {award.title}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(award.id)}
                  className="hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                  title="Edit award"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(award.id)}
                  className="text-red-500 hover:text-danger dark:text-gray-300 dark:hover:text-danger"
                  disabled={isDeleting}
                  title="Delete award"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {award.category && <span>{award.category} • </span>}
              {award.awardYear} • {award.awardedBy}
            </div>
            {award.description && (
              <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                {award.description}
              </p>
            )}
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
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Category
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Year
                </th>
                <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                  Awarded By
                </th>
                <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {awards.map((award) => (
                <tr
                  key={award.id}
                  className="border-b border-[#eee] hover:bg-gray-50 dark:border-strokedark dark:hover:bg-meta-4"
                >
                  <td className="px-4 py-5">
                    <div>
                      <h5 className="font-medium text-black dark:text-white">
                        {award.title}
                      </h5>
                      {award.bnTitle && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {award.bnTitle}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="text-black dark:text-white">
                      {award.category || "-"}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="text-black dark:text-white">
                      {award.awardYear}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="text-black dark:text-white">
                      {award.awardedBy}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => handleEdit(award.id)}
                        className="hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                        title="Edit award"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(award.id)}
                        className="hover:text-danger dark:text-gray-300 dark:hover:text-danger"
                        disabled={isDeleting}
                        title="Delete award"
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
