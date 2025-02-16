import { z } from 'zod';

export const createUserUploadSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size <= 5 * 1024 * 1024, {
    message: 'File size must be 5MB or less',
  }),
  userId: z.string().uuid(),
});

export const bulkCreateUserUploadSchema = z.object({
  files: z.array(z.instanceof(File)).max(10).refine(
    (files) => files.every((file) => file.size <= 5 * 1024 * 1024),
    { message: 'Each file size must be 5MB or less' }
  ),
  userId: z.string().uuid(),
});

export type CreateUserUploadInput = z.infer<typeof createUserUploadSchema>;
export type BulkCreateUserUploadInput = z.infer<typeof bulkCreateUserUploadSchema>;
