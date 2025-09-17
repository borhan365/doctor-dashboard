"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import IconLoading from "@/components/Loader/IconLoading";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import EmptyState from "@/components/States/EmptyState";
import { useAffiliations } from "@/hooks/useAffiliations";
import { Pagination } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import SidebarDrawer from "./ui/SidebarDrawer";
import Table from "./ui/Table";

const AffiliationsPage = () => {
  // Static data for demo purposes
  const user = { doctorId: "demo-doctor-id" };
  const doctorId = user?.doctorId;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAffiliation, setSelectedAffiliation] = useState<string | null>(
    null,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingAffiliationId, setEditingAffiliationId] = useState<
    string | null
  >(null);

  const { affiliations, isLoadingAffiliations, deleteAffiliation, isDeleting } =
    useAffiliations();
  const affiliationsPerPage = 10;

  // Filter affiliations for current doctor only
  const currentDoctorAffiliations = affiliations.filter(
    (aff) => aff.doctorId === doctorId,
  );

  // Filter based on search term
  const filteredAffiliations = searchTerm.trim()
    ? currentDoctorAffiliations.filter((aff) =>
        [aff.title, aff.hospitalName, aff.role, aff.bnTitle].some(
          (field) =>
            field && field.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
    : currentDoctorAffiliations;

  // Pagination
  const indexOfLastAffiliation = currentPage * affiliationsPerPage;
  const indexOfFirstAffiliation = indexOfLastAffiliation - affiliationsPerPage;
  const paginatedAffiliations = filteredAffiliations.slice(
    indexOfFirstAffiliation,
    indexOfLastAffiliation,
  );

  // Group affiliations for table
  const groupedAffiliations = {
    [doctorId!]: {
      doctorId,
      doctor: filteredAffiliations[0]?.doctor,
      affiliations: filteredAffiliations,
      createdAt: filteredAffiliations[0]?.createdAt,
    },
  };

  const currentAffiliations = Object.values(groupedAffiliations);

  // Handlers
  const handleOpenDrawer = () => {
    setEditingAffiliationId(null);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setEditingAffiliationId(null);
  };

  const handleEdit = (affiliationId: string) => {
    setEditingAffiliationId(affiliationId);
    setIsDrawerOpen(true);
  };

  const handleDelete = (affiliationId: string) => {
    setSelectedAffiliation(affiliationId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedAffiliation) {
      await deleteAffiliation(selectedAffiliation);
      setIsDeleteModalOpen(false);
      setSelectedAffiliation(null);
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            Affiliations
          </h2>
          <p className="text-sm text-gray-500">
            Manage your professional affiliations and memberships
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div>
            <input
              type="text"
              placeholder="Search affiliations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-stroke bg-transparent bg-white px-5 py-2 outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark dark:focus:border-primary"
            />
          </div>
          <PrimaryButton
            text="Add Affiliation"
            onClick={handleOpenDrawer}
            className="flex items-center justify-center gap-2"
          />
        </div>
      </div>

      {isLoadingAffiliations ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <IconLoading />
        </div>
      ) : filteredAffiliations.length === 0 ? (
        <EmptyState
          title="No affiliations found"
          description={
            searchTerm
              ? "Try adjusting your search terms"
              : "Get started by adding your affiliations"
          }
          action={
            <PrimaryButton
              text="Add Affiliation"
              onClick={handleOpenDrawer}
              className="flex items-center justify-center gap-2"
            />
          }
        />
      ) : (
        <Table
          currentAffiliations={currentAffiliations}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          isDeleting={isDeleting}
        />
      )}

      {/* Pagination */}
      {filteredAffiliations.length > 0 && (
        <div className="mt-4 flex items-center justify-end">
          <Pagination
            current={currentPage}
            total={filteredAffiliations.length}
            pageSize={affiliationsPerPage}
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
        title="Delete Affiliation"
        message="Are you sure you want to delete this affiliation? This action cannot be undone."
      />

      {/* Affiliation Sidebar Drawer */}
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        affiliationId={editingAffiliationId}
        doctorId={doctorId}
      />
    </div>
  );
};

export default AffiliationsPage;
