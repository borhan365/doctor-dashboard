"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import BookmarkCard from "../../Components/Bookmark/BookmarkCard";

export default function BookmarksPage() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch bookmarks
  const {
    data: bookmarks = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const { data } = await axios.get("/api/bookmarks/user");
      return data.bookmarks;
    },
    enabled: !!session,
  });

  // Filter bookmarks based on search term
  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Please sign in to view your bookmarks
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-slate-800">Bookmarks</h1>
        <p className="mb-6 text-slate-600">
          {bookmarks.length} saved hospitals
        </p>

        <div className="rounded-lg bg-white p-6 shadow-md">
          {/* Search Input */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search your bookmarks"
              className="w-full rounded-md border border-slate-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-slate-400"
              size={20}
            />
          </div>

          {/* Bookmarks List */}
          {isLoading ? (
            <div className="py-8 text-center">Loading...</div>
          ) : error ? (
            <div className="py-8 text-center text-red-500">
              {error instanceof Error
                ? error.message
                : "Error loading bookmarks"}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBookmarks.map((hospital) => (
                <BookmarkCard
                  key={hospital.id}
                  hospital={hospital}
                  onRemove={() => refetch()}
                />
              ))}

              {filteredBookmarks.length === 0 && (
                <div className="py-8 text-center text-slate-500">
                  No bookmarks found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
