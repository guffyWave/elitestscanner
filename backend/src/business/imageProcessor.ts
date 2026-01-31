import sharp from 'sharp';
import sizeOf from 'image-size';
import fs from 'fs';
import path from 'path';
import {
  EliHealthError,
  FileNotFound,
  InvalidImageDimensions,
  InvalidImageFormat,
  SomethingWentWrong,
} from '../utils/errors';
import {
  ALLOWED_FILE_TYPES,
  FILE_PATH_THUMBNAILS,
  FILE_PATH_UPLOADS,
  IMAGE_FORMAT_JPEG,
  MAX_THUMBNAIL_HEIGHT,
  MAX_THUMBNAIL_WIDTH,
} from '../utils/constants';
import { ImageMetadata } from '../common/types';

export class ImageProcessor {
  static async processImage(filePath: string): Promise<ImageMetadata> {
    try {
      if (!fs.existsSync(filePath)) {
        throw new FileNotFound();
      }

      // READ FILE INTO BUFFER
      const buffer = fs.readFileSync(filePath);

      // Extract metadata
      const { size } = fs.statSync(filePath);
      const dimensions = sizeOf(buffer);

      if (!dimensions.width || !dimensions.height) {
        throw new InvalidImageDimensions();
      }

      // Validate format
      // const allowedFormats = ['jpg', 'jpeg', 'png'];
      const format = (dimensions.type || '').toLowerCase();

      if (!ALLOWED_FILE_TYPES.includes(format)) {
        throw new InvalidImageFormat();
      }

      // Create thumbnail
      const thumbnailPath = path.join(
        FILE_PATH_UPLOADS,
        FILE_PATH_THUMBNAILS,
        `${Date.now()}_thumb.jpg`
      );

      await sharp(filePath)
        .resize(MAX_THUMBNAIL_WIDTH, MAX_THUMBNAIL_HEIGHT, { fit: 'cover' })
        .toFormat(IMAGE_FORMAT_JPEG)
        .toFile(thumbnailPath);

      return {
        size,
        width: dimensions.width,
        height: dimensions.height,
        format,
        thumbnailPath,
      };
    } catch (error) {
      if (error instanceof EliHealthError) {
        throw error;
      }

      throw new SomethingWentWrong(error instanceof Error ? error.message : ' ');
    }
  }
}
