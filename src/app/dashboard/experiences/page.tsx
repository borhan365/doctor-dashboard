"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import IconLoading from "@/components/Loader/IconLoading";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import EmptyState from "@/components/States/EmptyState";
import { useExperiences } from "@/hooks/useExperiences";
import { Pagination } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SidebarDrawer from "./ui/SidebarDrawer";
import Table from "./ui/Table";

const ExperiencesPage = () => {
  // Static data for demo purposes
  const user = { doctorId: "demo-doctor-id" };
  const doctorId = user?.doctorId;

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    null,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(
    null,
  );
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(
    doctorId || null,
  );

  const { experiences, isLoadingExperiences, deleteExperience, isDeleting } =
    useExperiences();
  const router = useRouter();
  const experiencesPerPage = 10;

  // Filter experiences for current doctor only
  const currentDoctorExperiences = experiences.filter(
    (exp) => exp.doctorId === doctorId,
  );

  // Filter based on search term
  const filteredExperiences = searchTerm.trim()
    ? currentDoctorExperiences.filter((exp) =>
        [
          exp.hospitalName,
          exp.designation,
          exp.department,
          exp.description,
        ].some(
          (field) =>
            field && field.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
    : currentDoctorExperiences;

  // Pagination
  const indexOfLastExperience = currentPage * experiencesPerPage;
  const indexOfFirstExperience = indexOfLastExperience - experiencesPerPage;
  const paginatedExperiences = filteredExperiences.slice(
    indexOfFirstExperience,
    indexOfLastExperience,
  );

  // Group experiences for table (if still needed)
  const groupedExperiences = {
    [doctorId!]: {
      doctorId,
      doctor: filteredExperiences[0]?.doctor,
      experiences: filteredExperiences,
      createdAt: filteredExperiences[0]?.createdAt,
    },
  };

  const currentExperiences = Object.values(groupedExperiences);

  // Handlers
  const handleOpenDrawer = () => {
    setEditingExperienceId(null);
    setSelectedDoctorId(doctorId || null);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setEditingExperienceId(null);
    setSelectedDoctorId(null);
  };

  const handleEdit = (experienceId: string) => {
    setEditingExperienceId(experienceId);
    setSelectedDoctorId(null);
    setIsDrawerOpen(true);
  };

  const handleDelete = (experienceId: string) => {
    setSelectedExperience(experienceId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedExperience) {
      await deleteExperience(selectedExperience);
      setIsDeleteModalOpen(false);
      setSelectedExperience(null);
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            Doctor Experiences
          </h2>
          <p className="text-sm text-gray-500">
            Add your experiences to your profile to help potential employers
            know more about you.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div>
            <input
              type="text"
              placeholder="Search experiences..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-stroke bg-transparent bg-white px-5 py-2 outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark dark:focus:border-primary"
            />
          </div>
          <PrimaryButton
            text="Add Experience"
            onClick={handleOpenDrawer}
            className="flex items-center justify-center gap-2"
          />
        </div>
      </div>

      {isLoadingExperiences ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <IconLoading />
        </div>
      ) : filteredExperiences.length === 0 ? (
        <EmptyState
          title="No experiences found"
          description={
            searchTerm
              ? "Try adjusting your search terms"
              : "Get started by adding a doctor's experience"
          }
          action={
            <PrimaryButton
              text="Add Experience"
              onClick={handleOpenDrawer}
              className="flex items-center justify-center gap-2"
            />
          }
        />
      ) : (
        <Table
          currentExperiences={currentExperiences}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          isDeleting={isDeleting}
        />
      )}

      {/* Pagination */}
      {filteredExperiences.length > 0 && (
        <div className="mt-4 flex items-center justify-end">
          <Pagination
            current={currentPage}
            total={filteredExperiences.length}
            pageSize={experiencesPerPage}
            onChange={setCurrentPage}
            showSizeChanger={false}
            prevIcon={<ChevronLeft className="h-4 w-4" />}
            nextIcon={<ChevronRight className="h-4 w-4" />}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Experience"
        message="Are you sure you want to delete this experience record? This action cannot be undone."
      />

      {/* Experience Sidebar Drawer */}
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        experienceId={editingExperienceId}
        doctorId={doctorId || selectedDoctorId}
      />
    </div>
  );
};

export default ExperiencesPage;
