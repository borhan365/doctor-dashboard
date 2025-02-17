import { z } from 'zod'
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, MAX_FILES_PER_REQUEST } from '../config/s3'

export const fileSchema = z.object({
  size: z.number().max(MAX_FILE_SIZE, 'File size too large'),
  type: z.string().refine(
    (type) => ALLOWED_FILE_TYPES.includes(type),
    'Invalid file type'
  )
})

export const bulkUploadSchema = z.object({
  files: z.array(fileSchema).max(MAX_FILES_PER_REQUEST)
})