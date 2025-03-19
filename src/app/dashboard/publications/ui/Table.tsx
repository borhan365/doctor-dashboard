import { DoctorPublication } from "@/types/publications";
import { Edit, ExternalLink, Trash2 } from "lucide-react";
import { useState } from "react";

interface TableProps {
  currentPublications: any[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  handleCreate: (doctorId: string) => void;
  isDeleting: boolean;
}

function Table({
  currentPublications,
  handleDelete,
  handleEdit,
  handleCreate,
  isDeleting,
}: TableProps) {
  // State to track which doctor groups are expanded
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {},
  );

  // Toggle expansion for a doctor group
  const toggleGroup = (doctorId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [doctorId]: !prev[doctorId],
    }));
  };

  // Flatten the publications array from the groups
  const publications = currentPublications.reduce<DoctorPublication[]>(
    (acc, group) => [...acc, ...group.publications],
    [],
  );

  return (
    <div className="rounded-md border border-stroke bg-white p-6 dark:border-strokedark dark:bg-boxdark">
      {/* Mobile View */}
      <div className="block md:hidden">
        {publications.map((pub) => (
          <div
            key={pub.id}
            className="border-b border-stroke p-4 dark:border-strokedark"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium text-black dark:text-white">
                {pub.title}
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  onClick={() => handleEdit(pub.id)}
                  className="hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                  title="Edit publication"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(pub.id)}
                  className="text-red-500 hover:text-danger dark:text-gray-300 dark:hover:text-danger"
                  disabled={isDeleting}
                  title="Delete publication"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            {pub.description && (
              <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                {pub.description}
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
                <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                  Description
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  URL
                </th>
                <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {publications.map((pub) => (
                <tr
                  key={pub.id}
                  className="border-b border-[#eee] hover:bg-gray-50 dark:border-strokedark dark:hover:bg-meta-4"
                >
                  <td className="px-4 py-5">
                    <div>
                      <h5 className="font-medium text-black dark:text-white">
                        {pub.title}
                      </h5>
                      {pub.bnTitle && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {pub.bnTitle}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {pub.description && (
                        <p className="line-clamp-2">{pub.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                    >
                      <span className="text-sm">Visit</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => handleEdit(pub.id)}
                        className="hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                        title="Edit publication"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pub.id)}
                        className="hover:text-danger dark:text-gray-300 dark:hover:text-danger"
                        disabled={isDeleting}
                        title="Delete publication"
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
