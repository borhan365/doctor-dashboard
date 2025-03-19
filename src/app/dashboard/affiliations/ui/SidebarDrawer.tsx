import { ApiUrl } from "@/app/Variables";
import IconLoading from "@/components/Loader/IconLoading";
import { useAffiliations } from "@/hooks/useAffiliations";
import { AffiliationFormData } from "@/types/affiliations";
import { Button, Drawer, Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  affiliationId?: string | null;
  doctorId?: string | null;
}

function SidebarDrawer({
  isOpen,
  onClose,
  affiliationId = null,
  doctorId,
}: SidebarDrawerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AffiliationFormData>({
    doctorId: "",
    title: "",
    hospitalName: "",
    bnTitle: "",
    role: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    isCurrent: false,
  });
  const [doctorName, setDoctorName] = useState<string>("");

  const { createAffiliation, updateAffiliation, isCreating, isUpdating } =
    useAffiliations();

  // Load affiliation details if ID exists
  useEffect(() => {
    const loadAffiliationDetails = async () => {
      if (affiliationId && isOpen) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${ApiUrl}/doctors/affiliations/get-single/${affiliationId}`,
          );

          if (!response.ok) {
            throw new Error("Failed to fetch affiliation details");
          }

          const data = await response.json();

          // Format dates for the form
          setFormData({
            doctorId: data.doctorId,
            title: data.title,
            hospitalName: data.hospitalName,
            bnTitle: data.bnTitle || "",
            role: data.role || "",
            startDate: data.startDate
              ? new Date(data.startDate).toISOString().split("T")[0]
              : "",
            endDate: data.endDate
              ? new Date(data.endDate).toISOString().split("T")[0]
              : "",
            isCurrent: !data.endDate,
          });

          setDoctorName(data.doctor?.name || "");
        } catch (error) {
          console.error("Error fetching affiliation:", error);
          toast.error("Failed to load affiliation details");
        } finally {
          setIsLoading(false);
        }
      } else if (doctorId) {
        // If creating new with pre-selected doctor
        setFormData((prev) => ({
          ...prev,
          doctorId,
        }));

        // Fetch doctor name for display
        fetchDoctorName(doctorId);
      }
    };

    if (isOpen) {
      loadAffiliationDetails();
    } else {
      // Reset form when drawer closes
      setFormData({
        doctorId: "",
        title: "",
        hospitalName: "",
        bnTitle: "",
        role: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: "",
        isCurrent: false,
      });
      setDoctorName("");
    }
  }, [isOpen, affiliationId, doctorId]);

  // Fetch doctor name when doctorId changes
  const fetchDoctorName = async (id: string) => {
    try {
      const response = await fetch(`${ApiUrl}/doctors/get-single/${id}`);
      if (response.ok) {
        const data = await response.json();
        setDoctorName(data.name || "");
      }
    } catch (error) {
      console.error("Error fetching doctor name:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // If doctor changed, fetch the doctor name
    if (field === "doctorId" && value) {
      fetchDoctorName(value);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
      // Clear end date if current is checked
      ...(name === "isCurrent" && checked ? { endDate: "" } : {}),
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.doctorId) {
        toast.error("Please select a doctor");
        return;
      }

      if (!formData.title) {
        toast.error("Title is required");
        return;
      }

      if (!formData.hospitalName) {
        toast.error("Hospital/Organization name is required");
        return;
      }

      if (!formData.startDate) {
        toast.error("Start date is required");
        return;
      }

      // Prepare data for submission
      const submissionData = {
        ...formData,
        // If current job, set endDate to null
        endDate: formData.isCurrent ? null : formData.endDate,
      };

      if (affiliationId) {
        // Update existing affiliation
        await updateAffiliation({
          id: affiliationId,
          data: submissionData,
        });
      } else {
        // Create new affiliation
        await createAffiliation(submissionData);
      }

      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while saving",
      );
    }
  };

  return (
    <Drawer
      title={affiliationId ? "Edit Affiliation" : "Add Affiliation"}
      placement="right"
      onClose={onClose}
      open={isOpen}
      width={600}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={isCreating || isUpdating}
            disabled={!formData.doctorId}
          >
            {isCreating || isUpdating ? "Saving..." : "Save"}
          </Button>
        </Space>
      }
    >
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <IconLoading fullScreen={false} inline={true} />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Only show the form if a doctor is selected or we're editing */}
          {formData.doctorId || affiliationId ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white">
                  Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                  placeholder="Enter affiliation title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white">
                  Hospital/Organization Name*
                </label>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                  placeholder="Enter hospital or organization name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white">
                  Bengali Title{" "}
                  <span className="text-xs text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  name="bnTitle"
                  value={formData.bnTitle}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                  placeholder="Enter Bengali title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white">
                  Role{" "}
                  <span className="text-xs text-gray-500">
                    (optional: e.g. Member, Fellow, Fellowship, Fellowship in,
                    Consultant, Surgeon, Resident, Visiting Doctor)
                  </span>
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                  placeholder="Enter role"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white">
                    Start Date*
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleFormChange}
                    disabled={formData.isCurrent}
                    className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100 disabled:text-gray-400 dark:border-strokedark dark:bg-boxdark dark:text-white dark:disabled:bg-gray-700"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isCurrent"
                    name="isCurrent"
                    checked={formData.isCurrent}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="isCurrent"
                    className="ml-2 text-sm font-medium text-slate-700 dark:text-white"
                  >
                    Current Affiliation
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-md border border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">
                Please select a doctor to continue adding affiliation details
              </p>
            </div>
          )}
        </div>
      )}
    </Drawer>
  );
}

export default SidebarDrawer;
