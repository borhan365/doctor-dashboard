import { ApiUrl } from "@/app/Variables";
import IconLoading from "@/components/Loader/IconLoading";
import { useEducations } from "@/hooks/useEducations";
import { Education } from "@/types/educations";
import { Button, Drawer, Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  educationId?: string | null;
  doctorId?: string | null;
}

function SidebarDrawer({
  isOpen,
  onClose,
  educationId = null,
  doctorId,
}: SidebarDrawerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Education & { doctorId: string }>({
    doctorId: "",
    instituteName: "",
    yearOfCompletion: new Date().getFullYear(),
    degreeType: "",
    degreeTitle: "",
    specialization: "",
    country: "",
  });
  const [doctorName, setDoctorName] = useState<string>("");

  const { createEducation, updateEducation, isCreating, isUpdating } =
    useEducations();

  // Load education details if ID exists
  useEffect(() => {
    const loadEducationDetails = async () => {
      if (educationId && isOpen) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${ApiUrl}/doctors/educations/get-single/${educationId}`,
          );

          if (!response.ok) {
            throw new Error("Failed to fetch education details");
          }

          const data = await response.json();

          setFormData({
            doctorId: data.doctorId,
            instituteName: data.instituteName,
            yearOfCompletion: data.yearOfCompletion,
            degreeType: data.degreeType,
            degreeTitle: data.degreeTitle || "",
            specialization: data.specialization,
            country: data.country || "",
          });

          setDoctorName(data.doctor?.name || "");
        } catch (error) {
          console.error("Error fetching education:", error);
          toast.error("Failed to load education details");
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
      loadEducationDetails();
    } else {
      // Reset form when drawer closes
      setFormData({
        doctorId: "",
        instituteName: "",
        yearOfCompletion: new Date().getFullYear(),
        degreeType: "",
        degreeTitle: "",
        specialization: "",
        country: "",
      });
      setDoctorName("");
    }
  }, [isOpen, educationId, doctorId]);

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

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === "" ? "" : parseInt(value, 10);

    setFormData((prev) => ({
      ...prev,
      [name]: numValue,
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
        !formData.instituteName ||
        !formData.degreeType ||
        !formData.specialization ||
        !formData.yearOfCompletion
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      if (educationId) {
        // Update existing education
        await updateEducation({
          id: educationId,
          data: formData,
        });
        toast.success("Education updated successfully");
      } else {
        // Create new education
        await createEducation({
          doctorId: formData.doctorId,
          education: formData,
        });
        toast.success("Education created successfully");
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
      title={educationId ? "Edit Education" : "Add Education"}
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
          {formData.doctorId || educationId ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white">
                  Institution Name*
                </label>
                <input
                  type="text"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                  placeholder="Enter institution name"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white">
                    Degree Type*
                  </label>
                  <input
                    type="text"
                    name="degreeType"
                    value={formData.degreeType}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                    placeholder="Enter degree type"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white">
                    Degree Title{" "}
                    <span className="text-xs text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="degreeTitle"
                    value={formData.degreeTitle}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                    placeholder="E.g., MBBS, MD, etc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white">
                  Specialization*
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                  placeholder="Enter specialization"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white">
                    Year of Completion*
                  </label>
                  <input
                    type="number"
                    name="yearOfCompletion"
                    value={formData.yearOfCompletion}
                    onChange={handleNumberChange}
                    className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                    placeholder="Enter completion year"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white">
                    Country{" "}
                    <span className="text-xs text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                    placeholder="Enter country"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-md border border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">
                Please select a doctor to continue adding education details
              </p>
            </div>
          )}
        </div>
      )}
    </Drawer>
  );
}

export default SidebarDrawer;
