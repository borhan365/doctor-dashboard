"use client";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import IconLoading from "@/components/Loader/IconLoading";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import EmptyState from "@/components/States/EmptyState";
import { usePublications } from "@/hooks/usePublications";
import { useAuth } from "@/store/useAuth";
import { Pagination } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import SidebarDrawer from "./ui/SidebarDrawer";
import Table from "./ui/Table";

const PublicationsPage = () => {
  const { user } = useAuth();
  const doctorId = user?.doctorId;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState<string | null>(
    null,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingPublicationId, setEditingPublicationId] = useState<
    string | null
  >(null);

  const { publications, isLoadingPublications, deletePublication, isDeleting } =
    usePublications();
  const publicationsPerPage = 10;

  // Filter publications for current doctor only
  const currentDoctorPublications = publications.filter(
    (pub) => pub.doctorId === doctorId,
  );

  // Filter based on search term
  const filteredPublications = searchTerm.trim()
    ? currentDoctorPublications.filter((pub) =>
        [pub.title, pub.description, pub.url].some(
          (field) =>
            field && field.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
    : currentDoctorPublications;

  // Pagination
  const indexOfLastPublication = currentPage * publicationsPerPage;
  const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
  const paginatedPublications = filteredPublications.slice(
    indexOfFirstPublication,
    indexOfLastPublication,
  );

  // Group publications for table
  const groupedPublications = {
    [doctorId!]: {
      doctorId,
      doctor: filteredPublications[0]?.doctor,
      publications: filteredPublications,
      createdAt: filteredPublications[0]?.createdAt,
    },
  };

  const currentPublications = Object.values(groupedPublications);

  // Handlers
  const handleOpenDrawer = () => {
    setEditingPublicationId(null);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setEditingPublicationId(null);
  };

  const handleEdit = (publicationId: string) => {
    setEditingPublicationId(publicationId);
    setIsDrawerOpen(true);
  };

  const handleDelete = (publicationId: string) => {
    setSelectedPublication(publicationId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedPublication) {
      await deletePublication(selectedPublication);
      setIsDeleteModalOpen(false);
      setSelectedPublication(null);
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            Publications
          </h2>
          <p className="text-sm text-gray-500">
            Manage your research papers and publications
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div>
            <input
              type="text"
              placeholder="Search publications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-stroke bg-transparent bg-white px-5 py-2 outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark dark:focus:border-primary"
            />
          </div>
          <PrimaryButton
            text="Add Publication"
            onClick={handleOpenDrawer}
            className="flex items-center justify-center gap-2"
          />
        </div>
      </div>

      {isLoadingPublications ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <IconLoading />
        </div>
      ) : filteredPublications.length === 0 ? (
        <EmptyState
          title="No publications found"
          description={
            searchTerm
              ? "Try adjusting your search terms"
              : "Get started by adding your publications"
          }
          action={
            <PrimaryButton
              text="Add Publication"
              onClick={handleOpenDrawer}
              className="flex items-center justify-center gap-2"
            />
          }
        />
      ) : (
        <Table
          currentPublications={currentPublications}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          isDeleting={isDeleting}
        />
      )}

      {/* Pagination */}
      {filteredPublications.length > 0 && (
        <div className="mt-4 flex items-center justify-end">
          <Pagination
            current={currentPage}
            total={filteredPublications.length}
            pageSize={publicationsPerPage}
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
        title="Delete Publication"
        message="Are you sure you want to delete this publication? This action cannot be undone."
      />

      {/* Publication Sidebar Drawer */}
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        publicationId={editingPublicationId}
        doctorId={doctorId}
      />
    </div>
  );
};

export default PublicationsPage;
