import sharp from 'sharp';
import sizeOf from 'image-size';
import fs from 'fs';
import path from 'path';

export interface ImageMetadata {
  size: number;
  width: number;
  height: number;
  format: string;
  thumbnailPath: string;
}

export class ImageProcessor {
  static async processImage(filePath: string): Promise<ImageMetadata> {
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found.');
    }

    // READ FILE INTO BUFFER (fixes the TypeScript issue)
    const buffer = fs.readFileSync(filePath);

    // Extract metadata
    const { size } = fs.statSync(filePath);
    const dimensions = sizeOf(buffer);

    if (!dimensions.width || !dimensions.height) {
      throw new Error('Unable to read image dimensions');
    }

    // Validate format
    const allowedFormats = ['jpg', 'jpeg', 'png'];
    const format = (dimensions.type || '').toLowerCase();

    if (!allowedFormats.includes(format)) {
      throw new Error('Invalid file format. Only JPG/PNG allowed.');
    }

    // Create thumbnail
    const thumbnailPath = path.join('uploads', 'thumbnails', `${Date.now()}_thumb.jpg`);

    await sharp(filePath).resize(200, 200, { fit: 'cover' }).toFormat('jpeg').toFile(thumbnailPath);

    return {
      size,
      width: dimensions.width,
      height: dimensions.height,
      format,
      thumbnailPath,
    };
  }
}
