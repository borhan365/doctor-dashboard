"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import IconLoading from "@/components/Loader/IconLoading";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import EmptyState from "@/components/States/EmptyState";
import { useEducations } from "@/hooks/useEducations";
import { Pagination } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import SidebarDrawer from "./ui/SidebarDrawer";
import Table from "./ui/Table";

const EducationsPage = () => {
  // Static data for demo purposes
  const user = { doctorId: "demo-doctor-id" };
  const doctorId = user?.doctorId;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState<string | null>(
    null,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingEducationId, setEditingEducationId] = useState<string | null>(
    null,
  );

  const { educations, isLoadingEducations, deleteEducation, isDeleting } =
    useEducations();
  const educationsPerPage = 10;

  // Filter educations for current doctor only
  const currentDoctorEducations = educations.filter(
    (edu) => edu.doctorId === doctorId,
  );

  // Filter based on search term
  const filteredEducations = searchTerm.trim()
    ? currentDoctorEducations.filter((edu) =>
        [
          edu.instituteName,
          edu.degreeType,
          edu.degreeTitle,
          edu.specialization,
          edu.country,
        ].some(
          (field) =>
            field && field.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
    : currentDoctorEducations;

  // Pagination
  const indexOfLastEducation = currentPage * educationsPerPage;
  const indexOfFirstEducation = indexOfLastEducation - educationsPerPage;
  const paginatedEducations = filteredEducations.slice(
    indexOfFirstEducation,
    indexOfLastEducation,
  );

  // Group educations for table (if still needed)
  const groupedEducations = {
    [doctorId!]: {
      doctorId,
      doctor: filteredEducations[0]?.doctor,
      educations: filteredEducations,
      createdAt: filteredEducations[0]?.createdAt,
    },
  };

  const currentEducations = Object.values(groupedEducations);

  // Handlers
  const handleDelete = (educationId: string) => {
    setSelectedEducation(educationId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedEducation) {
      try {
        await deleteEducation(selectedEducation);
        setIsDeleteModalOpen(false);
        setSelectedEducation(null);
      } catch (error) {
        console.error("Error deleting education:", error);
      }
    }
  };

  const handleEdit = (educationId: string) => {
    setEditingEducationId(educationId);
    setIsDrawerOpen(true);
  };

  const handleOpenDrawer = () => {
    setEditingEducationId(null);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setEditingEducationId(null);
  };

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            Education Information
          </h2>
          <p className="text-sm text-gray-500">
            Add your educational qualifications to help showcase your academic
            background.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div>
            <input
              type="text"
              placeholder="Search educations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-stroke bg-transparent bg-white px-5 py-2 outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark dark:focus:border-primary"
            />
          </div>
          <PrimaryButton
            text="Add Education"
            onClick={handleOpenDrawer}
            className="flex items-center justify-center gap-2"
          />
        </div>
      </div>

      {isLoadingEducations ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <IconLoading />
        </div>
      ) : filteredEducations.length === 0 ? (
        <EmptyState
          title="No education records found"
          description={
            searchTerm
              ? "Try adjusting your search terms"
              : "Get started by adding your educational qualifications"
          }
          action={
            <PrimaryButton
              text="Add Education"
              onClick={handleOpenDrawer}
              className="flex items-center justify-center gap-2"
            />
          }
        />
      ) : (
        <Table
          currentEducations={currentEducations}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          isDeleting={isDeleting}
        />
      )}

      {/* Pagination */}
      {filteredEducations.length > 0 && (
        <div className="mt-4 flex items-center justify-end">
          <Pagination
            current={currentPage}
            total={filteredEducations.length}
            pageSize={educationsPerPage}
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
        title="Delete Education"
        message="Are you sure you want to delete this education record? This action cannot be undone."
      />

      {/* Education Sidebar Drawer */}
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        educationId={editingEducationId}
        doctorId={doctorId}
      />
    </div>
  );
};

export default EducationsPage;
