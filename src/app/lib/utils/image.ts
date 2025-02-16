import sharp from 'sharp'
import { UploadError } from '../errors/upload'

export async function processImage(
  buffer: Buffer,
  options?: {
    maxWidth?: number
    maxHeight?: number
    quality?: number
  }
) {
  try {
    let image = sharp(buffer)
    const metadata = await image.metadata()

    if (options?.maxWidth || options?.maxHeight) {
      image = image.resize(
        options.maxWidth,
        options.maxHeight,
        { fit: 'inside', withoutEnlargement: true }
      )
    }

    if (options?.quality) {
      image = image.jpeg({ quality: options.quality })
    }

    return image.toBuffer()
  } catch (error) {
    throw new UploadError('Failed to process image', 500)
  }
}