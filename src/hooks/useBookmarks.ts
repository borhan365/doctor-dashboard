import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { BookmarkedArticle } from '@/types/bookmark';

export function useBookmarks() {
  const { data: session } = useSession();
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!session?.user) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/bookmarks/user');
        if (!response.ok) throw new Error('Failed to fetch bookmarks');
        
        const data = await response.json();
        setBookmarks(data.bookmarks);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarks();
  }, [session]);

  return { bookmarks, isLoading, error };
}
