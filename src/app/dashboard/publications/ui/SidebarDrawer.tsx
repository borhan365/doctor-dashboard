import { ApiUrl } from "@/app/Variables";
import IconLoading from "@/components/Loader/IconLoading";
import { usePublications } from "@/hooks/usePublications";
import { PublicationFormData } from "@/types/publications";
import { Button, Drawer, Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  publicationId?: string | null;
  doctorId?: string | null;
}

function SidebarDrawer({
  isOpen,
  onClose,
  publicationId = null,
  doctorId,
}: SidebarDrawerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PublicationFormData>({
    doctorId: "",
    title: "",
    bnTitle: "",
    url: "",
    description: "",
    bnDescription: "",
  });
  const [doctorName, setDoctorName] = useState<string>("");

  const { createPublication, updatePublication, isCreating, isUpdating } =
    usePublications();

  // Load publication details if ID exists
  useEffect(() => {
    const loadPublicationDetails = async () => {
      if (publicationId && isOpen) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${ApiUrl}/doctors/publications/get-single/${publicationId}`,
          );

          if (!response.ok) {
            throw new Error("Failed to fetch publication details");
          }

          const data = await response.json();

          setFormData({
            doctorId: data.doctorId,
            title: data.title,
            bnTitle: data.bnTitle || "",
            url: data.url,
            description: data.description || "",
            bnDescription: data.bnDescription || "",
          });

          setDoctorName(data.doctor?.name || "");
        } catch (error) {
          console.error("Error fetching publication:", error);
          toast.error("Failed to load publication details");
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
      loadPublicationDetails();
    } else {
      // Reset form when drawer closes
      setFormData({
        doctorId: "",
        title: "",
        bnTitle: "",
        url: "",
        description: "",
        bnDescription: "",
      });
      setDoctorName("");
    }
  }, [isOpen, publicationId, doctorId]);

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

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.doctorId) {
        toast.error("Please select a doctor");
        return;
      }

      if (!formData.title || !formData.url) {
        toast.error("Please fill all required fields");
        return;
      }

      // Validate URL format
      try {
        new URL(formData.url);
      } catch (e) {
        toast.error("Please enter a valid URL");
        return;
      }

      if (publicationId) {
        // Update existing publication
        await updatePublication({
          id: publicationId,
          data: formData,
        });
        toast.success("Publication updated successfully");
      } else {
        // Create new publication
        await createPublication(formData);
        toast.success("Publication created successfully");
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
      title={publicationId ? "Edit Publication" : "Add Publication"}
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
        <div className="space-y-4">
          {/* Only show the form if a doctor is selected or we're editing */}
          {formData.doctorId || publicationId ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white">
                  Publication Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                  placeholder="Enter publication title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white">
                  Publication URL*
                </label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                  placeholder="https://example.com/publication"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white">
                  Description{" "}
                  <span className="text-xs text-gray-500">(optional)</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                  placeholder="Enter publication description"
                />
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-md border border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">
                Please select a doctor to continue adding publication details
              </p>
            </div>
          )}
        </div>
      )}
    </Drawer>
  );
}

export default SidebarDrawer;
