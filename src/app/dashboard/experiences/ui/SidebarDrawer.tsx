import { ApiUrl } from "@/app/Variables";
import { useExperiences } from "@/hooks/useExperiences";
import { Experience } from "@/types/experiences";
import { Button, Drawer, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  experienceId?: string | null;
  doctorId?: string | null;
}

function SidebarDrawer({
  isOpen,
  onClose,
  experienceId = null,
  doctorId,
}: SidebarDrawerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Experience & { doctorId: string }>({
    doctorId: "",
    hospitalName: "",
    designation: "",
    department: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    description: "",
    isCurrent: false,
  });

  const { createExperience, updateExperience, isCreating, isUpdating } =
    useExperiences();

  useEffect(() => {
    const loadExperienceDetails = async () => {
      if (experienceId && isOpen) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${ApiUrl}/doctors/experiences/get-single/${experienceId}`,
          );

          if (!response.ok) {
            throw new Error("Failed to fetch experience details");
          }

          const data = await response.json();

          // Format dates for the form
          setFormData({
            doctorId: doctorId!,
            hospitalName: data.hospitalName,
            designation: data.designation,
            department: data.department,
            startDate: data.startDate
              ? new Date(data.startDate).toISOString().split("T")[0]
              : "",
            endDate: data.endDate
              ? new Date(data.endDate).toISOString().split("T")[0]
              : "",
            description: data.description || "",
            isCurrent: data.isCurrent || false,
          });
        } catch (error) {
          console.error("Error fetching experience:", error);
          toast.error("Failed to load experience details");
        } finally {
          setIsLoading(false);
        }
      } else {
        // For new experience
        setFormData((prev) => ({
          ...prev,
          doctorId: doctorId!,
        }));
      }
    };

    if (isOpen) {
      loadExperienceDetails();
    } else {
      // Reset form when drawer closes
      setFormData({
        doctorId: doctorId!,
        hospitalName: "",
        designation: "",
        department: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: "",
        description: "",
        isCurrent: false,
      });
    }
  }, [isOpen, experienceId, doctorId]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
      // Clear end date if current job is checked
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

      if (
        !formData.hospitalName ||
        !formData.designation ||
        !formData.department ||
        !formData.startDate
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      // Validate end date logic
      if (!formData.isCurrent && !formData.endDate) {
        toast.error(
          "Please provide an end date or check 'I currently work here'",
        );
        return;
      }

      // Prepare the data for submission
      const submissionData = {
        doctorId: formData.doctorId,
        hospitalName: formData.hospitalName,
        designation: formData.designation,
        department: formData.department,
        startDate: formData.startDate,
        endDate: formData.isCurrent ? null : formData.endDate,
        description: formData.description,
        isCurrent: formData.isCurrent,
      };

      if (experienceId) {
        // Update existing experience
        await updateExperience({
          id: experienceId,
          data: submissionData,
        });
        toast.success("Experience updated successfully");
      } else {
        // Create new experience
        await createExperience(submissionData);
        toast.success("Experience created successfully");
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
      title={experienceId ? "Edit Experience" : "Add Experience"}
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
          <Spin size="large" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-4">
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

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white">
                  Designation/Position*
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                  placeholder="Enter your job title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white">
                  Department*
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                  placeholder="Enter department name"
                />
              </div>
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
                  I currently work here
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-white">
                Description{" "}
                <span className="text-xs text-gray-500">(optional)</span>
              </label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleFormChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                placeholder="Describe your responsibilities and achievements"
              />
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}

export default SidebarDrawer;
