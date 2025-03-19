import { ApiUrl } from "@/app/Variables";
import IconLoading from "@/components/Loader/IconLoading";
import { useAwards } from "@/hooks/useAwards";
import { AwardFormData } from "@/types/awards";
import { Button, Drawer, Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  awardId?: string | null;
  doctorId?: string | null;
}

function SidebarDrawer({
  isOpen,
  onClose,
  awardId = null,
  doctorId,
}: SidebarDrawerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AwardFormData>({
    doctorId: "",
    title: "",
    bnTitle: "",
    awardYear: new Date().getFullYear(),
    awardedBy: "",
    category: "",
    description: "",
    bnDescription: "",
  });
  const [doctorName, setDoctorName] = useState<string>("");

  const { createAward, updateAward, isCreating, isUpdating } = useAwards();

  // Load award details if ID exists
  useEffect(() => {
    const loadAwardDetails = async () => {
      if (awardId && isOpen) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${ApiUrl}/doctors/awards/get-single/${awardId}`,
          );

          if (!response.ok) {
            throw new Error("Failed to fetch award details");
          }

          const data = await response.json();

          setFormData({
            doctorId: data.doctorId,
            title: data.title,
            bnTitle: data.bnTitle || "",
            awardYear: data.awardYear,
            awardedBy: data.awardedBy,
            category: data.category || "",
            description: data.description || "",
            bnDescription: data.bnDescription || "",
          });

          setDoctorName(data.doctor?.name || "");
        } catch (error) {
          console.error("Error fetching award:", error);
          toast.error("Failed to load award details");
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
      loadAwardDetails();
    } else {
      // Reset form when drawer closes
      setFormData({
        doctorId: "",
        title: "",
        bnTitle: "",
        awardYear: new Date().getFullYear(),
        awardedBy: "",
        category: "",
        description: "",
        bnDescription: "",
      });
      setDoctorName("");
    }
  }, [isOpen, awardId, doctorId]);

  const fetchDoctorName = async (id: string) => {
    try {
      const response = await fetch(`${ApiUrl}/doctors/get-single/${id}`);
      if (response.ok) {
        const data = await response.json();
        setDoctorName(data.name);
      }
    } catch (error) {
      console.error("Error fetching doctor name:", error);
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
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? "" : parseInt(value, 10),
    }));
  };

  const handleDoctorSelect = (doctorId: string, doctorName: string) => {
    setFormData((prev) => ({
      ...prev,
      doctorId,
    }));
    setDoctorName(doctorName);
  };

  const handleSubmit = async () => {
    if (!formData.doctorId) {
      toast.error("Please select a doctor");
      return;
    }

    if (!formData.title || !formData.awardYear || !formData.awardedBy) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (awardId) {
        // Update existing award
        await updateAward({
          id: awardId,
          data: formData,
        });
      } else {
        // Create new award
        await createAward(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving award:", error);
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

  return (
    <Drawer
      title={
        <div className="text-lg font-semibold">
          {awardId ? "Edit Award" : "Add New Award"}
        </div>
      }
      width={500}
      placement="right"
      onClose={onClose}
      open={isOpen}
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
          {formData.doctorId ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white">
                  Award Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                  placeholder="Enter award title"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white">
                    Award Year*
                  </label>
                  <input
                    type="number"
                    name="awardYear"
                    value={formData.awardYear}
                    onChange={handleNumberChange}
                    className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                    placeholder="Enter award year"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white">
                    Awarded By*
                  </label>
                  <input
                    type="text"
                    name="awardedBy"
                    value={formData.awardedBy}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                    placeholder="Enter awarding organization"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white">
                  Category{" "}
                  <span className="text-xs text-gray-500">
                    (optional: e.g. Best Doctor, Medical Excellence, Patient
                    Care)
                  </span>
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-slate-200 p-2 text-base font-medium placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-strokedark dark:bg-boxdark dark:text-white"
                  placeholder="Enter award category"
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
                  placeholder="Enter award description"
                />
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-md border border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">
                Please select a doctor to continue adding award details
              </p>
            </div>
          )}
        </div>
      )}
    </Drawer>
  );
}

export default SidebarDrawer;
