import { S3Client } from '@aws-sdk/client-s3'

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
})

export const ALLOWED_FILE_TYPES = process.env.ALLOWED_FILE_TYPES?.split(',') || []
export const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || '5242880')
export const MAX_FILES_PER_REQUEST = parseInt(process.env.MAX_FILES_PER_REQUEST || '10')