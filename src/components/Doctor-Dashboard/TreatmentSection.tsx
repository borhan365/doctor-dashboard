"use client";
import {
  useCreateTreatment,
  useDeleteTreatment,
  useTreatments,
  useUpdateTreatment,
} from "@/hooks/doctor/treatment/useDoctorTreatments";
import { Treatment } from "@/types/doctor.treatment.type";
import { Checkbox } from "antd";
import { Check, Edit2, Plus, Search, Trash2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

interface TreatmentSectionProps {
  selectedTreatments: string[];
  onChange: (treatments: string[]) => void;
}

function TreatmentSection({
  selectedTreatments = [],
  onChange,
}: TreatmentSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [newTreatment, setNewTreatment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: session } = useSession();

  // Use the API hooks
  const { data, isLoading } = useTreatments({
    page,
    limit,
    search: searchTerm,
    status: "published",
  });

  const createTreatmentMutation = useCreateTreatment();
  const updateTreatmentMutation = useUpdateTreatment(editingId || "");
  const deleteTreatmentMutation = useDeleteTreatment();

  const treatments = data?.treatments || [];

  // Separate default and custom treatments
  const defaultTreatments = treatments.filter((treatment) => !treatment.userId);
  const customTreatments = treatments.filter(
    (treatment) => treatment.userId === session?.user?.id,
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchTerm(value);
    setPage(1);
  }, []);

  const handleAddTreatment = async () => {
    if (!newTreatment.trim()) return;

    try {
      const formData = new FormData();
      formData.append("title", newTreatment.trim());
      formData.append("status", "published");

      const response = await createTreatmentMutation.mutateAsync(formData);
      if (response?.data?.id) {
        onChange([...selectedTreatments, response.data.id]);
      }
      setNewTreatment("");
      toast.success("Treatment added successfully");
    } catch (error) {
      toast.error("Failed to add treatment");
    }
  };

  const handleEdit = async () => {
    if (!editingId || !editValue.trim()) return;

    try {
      const formData = new FormData();
      formData.append("title", editValue.trim());

      await updateTreatmentMutation.mutateAsync(formData);
      setEditingId(null);
      setEditValue("");
      toast.success("Treatment updated successfully");
    } catch (error) {
      toast.error("Failed to update treatment");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTreatmentMutation.mutateAsync(id);
      // Remove from selected if it was selected
      if (selectedTreatments.includes(id)) {
        onChange(selectedTreatments.filter((treatmentId) => treatmentId !== id));
      }
      toast.success("Treatment deleted successfully");
    } catch (error) {
      toast.error("Failed to delete treatment");
    }
  };

  const handleToggleSelect = (id: string) => {
    const newSelection = selectedTreatments.includes(id)
      ? selectedTreatments.filter((treatmentId) => treatmentId !== id)
      : [...selectedTreatments, id];
    onChange(newSelection);
  };

  // Selected treatments badges section
  const renderSelectedBadges = () => {
    if (selectedTreatments.length === 0) return null;

    const selectedItems = treatments.filter((treatment) =>
      selectedTreatments.includes(treatment.id)
    );

    return (
      <div className="mb-4">
        <p className="mb-2 text-sm font-medium text-slate-700">
          Selected Treatments
        </p>
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((treatment) => (
            <span
              key={treatment.id}
              className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600"
            >
              {treatment.title}
              <button
                onClick={() => handleToggleSelect(treatment.id)}
                className="ml-1 text-blue-400 hover:text-blue-600"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  };

  // Render treatment list with selection functionality
  const renderTreatmentList = (
    treatments: Treatment[],
    isCustom: boolean = false,
  ) => {
    return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {treatments.map((treatment) => {
          const isSelected = selectedTreatments.some(
            (t) => t === treatment.id,
          );

          return (
            <div
              key={treatment.id}
              onClick={() => handleToggleSelect(treatment.id)}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-slate-100 ${
                isSelected ? "bg-blue-50" : "bg-slate-50"
              }`}
            >
              <div className="flex items-center">
                <Checkbox
                  checked={isSelected}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleToggleSelect(treatment.id);
                  }}
                >
                  <span className="ml-2 text-sm font-medium text-slate-700">
                    {treatment.title}
                    {treatment.bnTitle && (
                      <span className="ml-2 text-sm text-slate-500">
                        ({treatment.bnTitle})
                      </span>
                    )}
                  </span>
                </Checkbox>
              </div>

              {isCustom && (
                <div className="flex items-center gap-2">
                  {editingId === treatment.id ? (
                    <>
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="rounded-md border border-slate-200 px-2 py-1 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit();
                        }}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(null);
                          setEditValue("");
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(treatment.id);
                          setEditValue(treatment.title);
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(treatment.id);
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      {/* Title */}
      <div className="space-y-2">
        <p className="mb-4 border-b border-slate-200 pb-3 text-lg font-semibold text-slate-800">
          Doctor Treatments
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="treatment-search"
            className="text-sm font-medium text-slate-700"
          >
            Search treatments
          </label>
          <p className="text-sm text-slate-600">
            <span className="font-medium text-blue-600">
              {selectedTreatments.length}
            </span>{" "}
            treatments selected
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            id="treatment-search"
            className="block w-full rounded-lg border border-slate-200 p-2.5 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search for treatments..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <X className="h-5 w-5 text-slate-400" />
            </button>
          )}
        </div>
      </div>

      {/* Selected Treatments Badges */}
      {renderSelectedBadges()}

      {/* Default Treatments */}
      {!isLoading && defaultTreatments.length > 0 && (
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-slate-700">
            Default Treatments
          </p>
          {renderTreatmentList(defaultTreatments)}
        </div>
      )}

      {/* Custom Treatments */}
      {!isLoading && customTreatments.length > 0 && (
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-slate-700">
            My Custom Treatments
          </p>
          {renderTreatmentList(customTreatments, true)}
        </div>
      )}

      {/* Add New Custom Treatment */}
      <div className="mt-6">
        <p className="mb-2 text-xs text-slate-500">
          If your treatment is not listed above, you can add it here:
        </p>
        <div className="relative">
          <input
            type="text"
            value={newTreatment}
            onChange={(e) => setNewTreatment(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTreatment()}
            placeholder="Add new treatment"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 pr-20 text-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTreatment}
            disabled={createTreatmentMutation.isPending}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <div className="flex items-center gap-2 text-blue-600">
              <Plus className="h-5 w-5 text-blue-600 hover:text-blue-500" />
              <span className="text-sm text-blue-600 hover:text-blue-500">
                {createTreatmentMutation.isPending
                  ? "Adding..."
                  : "Add Treatment"}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TreatmentSection;
