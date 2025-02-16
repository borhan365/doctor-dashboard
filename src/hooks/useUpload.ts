import { useState } from 'react';
import { CreateUserUploadInput, BulkCreateUserUploadInput } from '@/lib/validation/upload';

export function useUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (input: CreateUserUploadInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', input.file);
      formData.append('userId', input.userId);

      const response = await fetch('/api/uploads/users/create', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const bulkUploadFiles = async (input: BulkCreateUserUploadInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      input.files.forEach((file) => formData.append('files', file));
      formData.append('userId', input.userId);

      const response = await fetch('/api/uploads/users/bulk-create', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Bulk upload failed');
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadFile, bulkUploadFiles, isLoading, error };
}
