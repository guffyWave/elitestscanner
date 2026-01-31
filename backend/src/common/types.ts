import { EliHealthError } from '../utils/errors';

export interface ImageMetadata {
  size: number;
  width: number;
  height: number;
  format: string;
  thumbnailPath: string;
}

export enum ScanValidity {
  VALID = 'VALID',
  INVALID = 'INVALID',
  EXPIRED = 'EXPIRED',
}

export enum QRScanQuality {
  GOOD = 'GOOD',
  BAD = 'BAD',
  UNKNOWN = 'UNKNOWN',
  NA = 'NA',
}

type QRCodeData = string | null;
type QRScanError = string | null;

export interface QRScanResult {
  qrCode: QRCodeData;
  valid: ScanValidity;
  errorMessage?: QRScanError;
}

export interface TestStripSubmissionRecord {
  qrCode: QRCodeData;
  originalImagePath: string;
  thumbnailPath: string | null;
  imageSize: number;
  imageDimensions: string;
  status: ScanValidity;
  errorMessage?: QRScanError;
}

export type TestStripSubmissionUploadResponse =
  | (Omit<
      TestStripSubmissionRecord,
      'originalImagePath' | 'thumbnailPath' | 'imageSize' | 'imageDimensions'
    > & {
      id: string;
      qrCodeValid: string;
      quality: string;
      processedAt: string;
      message: string;
    })
  | { error: string }
  | EliHealthError;

export interface TestStripSubmissionResponseModel {
  id: string;
  qr_code: string;
  original_image_path: string;
  thumbnail_path: string;
  image_size: number;
  image_dimensions: string;
  status: string;
  error_message: string | null;
  created_at: string;
}

export interface TestStripSubmissionsPageResponseModel {
  data: TestStripSubmissionResponseModel[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
