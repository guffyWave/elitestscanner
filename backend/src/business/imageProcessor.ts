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
import { logger } from '../utils/logger';

//@note : We should use Worker Queue (BullMQ + Redis) for better scalability in future
//Flow: User uploads file → API stores file  → API enqueues job → Redis → Worker process picks job → Worker does heavy processing, stores processed file  → Client polls or uses WebSocket to get status
//However, for now we are keeping it simple and do CPU-heavy image processing in the request itself, in Express directly.
export class ImageProcessor {
  static async processImage(filePath: string): Promise<ImageMetadata> {
    let imageMetadata: ImageMetadata;
    try {
      if (!fs.existsSync(filePath)) {
        throw new FileNotFound();
      }

      //Read the file into buffer
      const buffer = fs.readFileSync(filePath);

      // Extract metadata
      const { size } = fs.statSync(filePath);
      const dimensions = sizeOf(buffer);

      if (!dimensions.width || !dimensions.height) {
        throw new InvalidImageDimensions();
      }

      // validate format
      const format = (dimensions.type || '').toLowerCase();

      if (!ALLOWED_FILE_TYPES.includes(format)) {
        throw new InvalidImageFormat();
      }

      // create thumbnail
      const thumbnailPath = path.join(
        FILE_PATH_UPLOADS,
        FILE_PATH_THUMBNAILS,
        `${Date.now()}_thumb.jpg`
      );

      await sharp(filePath)
        .resize(MAX_THUMBNAIL_WIDTH, MAX_THUMBNAIL_HEIGHT, { fit: 'cover' })
        .toFormat(IMAGE_FORMAT_JPEG)
        .toFile(thumbnailPath);

      imageMetadata = {
        size,
        width: dimensions.width,
        height: dimensions.height,
        format,
        thumbnailPath,
      };

      logger.info('Image processed:', imageMetadata);

      return imageMetadata;
    } catch (error) {
      logger.error('Image processing error:', error);

      if (error instanceof EliHealthError) {
        throw error;
      }

      throw new SomethingWentWrong(error instanceof Error ? error.message : ' ');
    }
  }
}
