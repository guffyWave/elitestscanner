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
