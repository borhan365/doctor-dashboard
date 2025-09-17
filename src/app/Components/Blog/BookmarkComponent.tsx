"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface BookmarkComponentProps {
  articleId: number;
}

function BookmarkComponent({ articleId }: BookmarkComponentProps) {
  // Static data for demo purposes
  const session = { user: { id: "demo-user-id" } };
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!session?.user) return;

      try {
        const response = await fetch(
          `/api/bookmarks/check?articleId=${articleId}`,
        );
        if (!response.ok) throw new Error("Failed to check bookmark status");

        const data = await response.json();
        setIsBookmarked(data.isBookmarked);
      } catch (error) {
        console.error("Error checking bookmark status:", error);
        toast.error("Failed to check bookmark status");
      }
    };

    checkBookmarkStatus();
  }, [articleId, session]);

  const toggleBookmark = async () => {
    if (!session?.user) {
      toast.error("Please sign in to bookmark articles");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/bookmarks", {
        method: isBookmarked ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articleId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to toggle bookmark");
      }

      setIsBookmarked(!isBookmarked);
      toast.success(isBookmarked ? "Bookmark removed" : "Article bookmarked");
    } catch (error) {
      console.error("Error updating bookmark:", error);
      toast.error(
        error instanceof Error ? error.message : "Error updating bookmark",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      disabled={isLoading}
      className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-100 disabled:opacity-50"
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {isBookmarked ? (
        <BookmarkCheck className="h-5 w-5 text-blue-600" />
      ) : (
        <Bookmark className="h-5 w-5" />
      )}
    </button>
  );
}

export default BookmarkComponent;
