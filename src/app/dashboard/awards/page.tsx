"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import IconLoading from "@/components/Loader/IconLoading";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import EmptyState from "@/components/States/EmptyState";
import { useAwards } from "@/hooks/useAwards";
import { useAuth } from "@/store/useAuth";
import { Pagination } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import SidebarDrawer from "./ui/SidebarDrawer";
import Table from "./ui/Table";

const AwardsPage = () => {
  const { user } = useAuth();
  const doctorId = user?.doctorId;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAward, setSelectedAward] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingAwardId, setEditingAwardId] = useState<string | null>(null);

  const { awards, isLoadingAwards, deleteAward, isDeleting } = useAwards();
  const awardsPerPage = 10;

  // Filter awards for current doctor only
  const currentDoctorAwards = awards.filter(
    (award) => award.doctorId === doctorId,
  );

  // Filter based on search term
  const filteredAwards = searchTerm.trim()
    ? currentDoctorAwards.filter((award) =>
        [award.title, award.category, award.awardedBy, award.description].some(
          (field) =>
            field && field.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
    : currentDoctorAwards;

  // Pagination
  const indexOfLastAward = currentPage * awardsPerPage;
  const indexOfFirstAward = indexOfLastAward - awardsPerPage;
  const paginatedAwards = filteredAwards.slice(
    indexOfFirstAward,
    indexOfLastAward,
  );

  // Group awards for table
  const groupedAwards = {
    [doctorId!]: {
      doctorId,
      doctor: filteredAwards[0]?.doctor,
      awards: filteredAwards,
      createdAt: filteredAwards[0]?.createdAt,
    },
  };

  const currentAwards = Object.values(groupedAwards);

  // Handlers
  const handleOpenDrawer = () => {
    setEditingAwardId(null);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setEditingAwardId(null);
  };

  const handleEdit = (awardId: string) => {
    setEditingAwardId(awardId);
    setIsDrawerOpen(true);
  };

  const handleDelete = (awardId: string) => {
    setSelectedAward(awardId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedAward) {
      await deleteAward(selectedAward);
      setIsDeleteModalOpen(false);
      setSelectedAward(null);
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            Awards
          </h2>
          <p className="text-sm text-gray-500">
            Manage your awards and recognitions
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div>
            <input
              type="text"
              placeholder="Search awards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-stroke bg-transparent bg-white px-5 py-2 outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark dark:focus:border-primary"
            />
          </div>
          <PrimaryButton
            text="Add Award"
            onClick={handleOpenDrawer}
            className="flex items-center justify-center gap-2"
          />
        </div>
      </div>

      {isLoadingAwards ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <IconLoading />
        </div>
      ) : filteredAwards.length === 0 ? (
        <EmptyState
          title="No awards found"
          description={
            searchTerm
              ? "Try adjusting your search terms"
              : "Get started by adding your awards"
          }
          action={
            <PrimaryButton
              text="Add Award"
              onClick={handleOpenDrawer}
              className="flex items-center justify-center gap-2"
            />
          }
        />
      ) : (
        <Table
          currentAwards={currentAwards}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          isDeleting={isDeleting}
        />
      )}

      {/* Pagination */}
      {filteredAwards.length > 0 && (
        <div className="mt-4 flex items-center justify-end">
          <Pagination
            current={currentPage}
            total={filteredAwards.length}
            pageSize={awardsPerPage}
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
        title="Delete Award"
        message="Are you sure you want to delete this award? This action cannot be undone."
      />

      {/* Award Sidebar Drawer */}
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        awardId={editingAwardId}
        doctorId={doctorId}
      />
    </div>
  );
};

export default AwardsPage;
