"use client";
import {
  useCreateDegree,
  useDegrees,
  useDeleteDegree,
  useUpdateDegree,
} from "@/hooks/doctor/degree/useDegree";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Check, Edit2, Plus, Search, Trash2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface DegreeSectionProps {
  selectedDegrees: string[];
  onChange: (degrees: string[]) => void;
}

function DegreeSection({ selectedDegrees = [], onChange }: DegreeSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [newDegree, setNewDegree] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  // Fetch degrees from API
  const { data, isLoading } = useDegrees({
    status: "published",
    search: searchTerm,
  });

  const session = {
    user: {
      id: "1234567890",
      name: "John Doe",
      email: "john.doe@example.com",
      image: "https://via.placeholder.com/150",
      doctorProfile: {
        id: "1234567890",
        name: "John Doe",
        email: "john.doe@example.com",
        image: "https://via.placeholder.com/150",
      },
    },
  };
  // Mutations
  const createDegreeMutation = useCreateDegree();
  const updateDegreeMutation = useUpdateDegree(editingId || "");
  const deleteDegreeMutation = useDeleteDegree();

  // Separate default and custom degrees
  const defaultDegrees =
    data?.degrees?.filter((degree) => !degree.userId) || [];
  const customDegrees =
    data?.degrees?.filter((degree) => degree.userId === session?.user?.id) ||
    [];

  const handleAddDegree = async () => {
    if (!newDegree.trim()) return;

    try {
      const formData = new FormData();
      formData.append("title", newDegree.trim());
      formData.append("status", "published");

      const response = await createDegreeMutation.mutateAsync(formData);
      // Auto-select the newly created degree
      if (response?.data?.id) {
        onChange([...selectedDegrees, response.data.id]);
      }
      setNewDegree("");
      toast.success("Degree added successfully");
    } catch (error) {
      toast.error("Failed to add degree");
    }
  };

  const handleEdit = async () => {
    if (!editingId || !editValue.trim()) return;

    try {
      const formData = new FormData();
      formData.append("title", editValue.trim());

      await updateDegreeMutation.mutateAsync(formData);
      setEditingId(null);
      setEditValue("");
      toast.success("Degree updated successfully");
    } catch (error) {
      toast.error("Failed to update degree");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDegreeMutation.mutateAsync(id);
      // Remove from selected if it was selected
      if (selectedDegrees.includes(id)) {
        onChange(selectedDegrees.filter((degreeId) => degreeId !== id));
      }
      toast.success("Degree deleted successfully");
    } catch (error) {
      toast.error("Failed to delete degree");
    }
  };

  const handleToggleSelect = (id: string, e: CheckboxChangeEvent) => {
    const newSelection = e.target.checked
      ? [...selectedDegrees, id]
      : selectedDegrees.filter((degreeId) => degreeId !== id);
    onChange(newSelection);
  };

  const renderDegreeList = (
    degrees: typeof defaultDegrees,
    isCustom: boolean = false,
  ) => (
    <div className="grid max-h-[200px] grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-4">
      {degrees.map((degree) => (
        <div
          key={degree.id}
          className="group relative flex items-center justify-between rounded-lg bg-slate-50 p-2"
        >
          {editingId === degree.id ? (
            <div className="ml-3 flex items-center gap-2">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="rounded border border-slate-200 px-2 py-1 text-sm"
                autoFocus
              />
              <button
                onClick={handleEdit}
                className="text-green-600 hover:text-green-700"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <Checkbox
                checked={selectedDegrees.includes(degree.id)}
                onChange={(e) => handleToggleSelect(degree.id, e)}
              >
                <span className="text-sm font-medium text-slate-700">
                  {degree.title}
                </span>
              </Checkbox>
            </div>
          )}

          {isCustom && (
            <div className="hidden items-center gap-2 group-hover:flex">
              <button
                onClick={() => {
                  setEditingId(degree.id);
                  setEditValue(degree.title);
                }}
                className="text-slate-400 hover:text-blue-600"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(degree.id)}
                className="text-slate-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <p className="mb-4 border-b border-slate-200 pb-3 text-lg font-semibold text-slate-800">
        Select Your Degrees
      </p>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700">
            Search Your Degrees <span className="text-red-500">*</span>
          </p>
          <p className="text-sm text-slate-600">
            <span className="font-medium text-blue-600">
              {selectedDegrees.length}
            </span>{" "}
            degrees selected
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search degrees..."
          />
        </div>

        {/* Selected Degrees */}
        {selectedDegrees.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">
              Selected Degrees
            </p>
            <div className="flex flex-wrap gap-2">
              {data?.degrees
                ?.filter((degree) => selectedDegrees.includes(degree.id))
                .map((degree) => (
                  <div
                    key={degree.id}
                    className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2"
                  >
                    <span className="text-sm font-medium text-blue-700">
                      {degree.title}
                    </span>
                    <button
                      onClick={() =>
                        handleToggleSelect(degree.id, {
                          target: { checked: false },
                        } as CheckboxChangeEvent)
                      }
                      className="text-blue-400 hover:text-blue-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Default Degrees */}
        {!isLoading && defaultDegrees.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">
              Default Degrees
            </p>
            {renderDegreeList(defaultDegrees)}
          </div>
        )}

        {/* Custom Degrees */}
        {!isLoading && customDegrees.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">
              My Custom Degrees
            </p>
            {renderDegreeList(customDegrees, true)}
          </div>
        )}

        {/* Add New Degree */}
        <div className="mt-4">
          <div className="relative">
            <input
              type="text"
              value={newDegree}
              onChange={(e) => setNewDegree(e.target.value)}
              placeholder="Add new degree"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 pr-20 text-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onKeyPress={(e) => e.key === "Enter" && handleAddDegree()}
            />
            <button
              onClick={handleAddDegree}
              disabled={createDegreeMutation.isPending}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <div className="flex items-center gap-2 text-blue-600">
                <Plus className="h-5 w-5 text-blue-600 hover:text-blue-500" />
                <span className="text-sm text-blue-600 hover:text-blue-500">
                  {createDegreeMutation.isPending ? "Adding..." : "Add Degree"}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DegreeSection;
