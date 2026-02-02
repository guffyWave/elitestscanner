export interface TestStripSubmissionListResponse {
  data: TestStripSubmissionModel[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
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

export interface TestStripSubmissionModel {
  id: string;
  qr_code: string;
  status: ScanValidity; // tighten typing if desired
  thumbnail_path: string;
  created_at: string; // or Date if you parse it
  original_image_path: string;
  image_size: number;
  image_dimensions: string; // e.g., "779x971"
  error_message: string | null;
}

export type TestStripSubmissionItem = Pick<
  TestStripSubmissionModel,
  'id' | 'qr_code' | 'status' | 'thumbnail_path' | 'created_at' | 'error_message'
>;

export interface UploadImageResponseModel {
  id: string;
  status: ScanValidity;
  qrCode: string;
  qrCodeValid: string;
  quality: string; // or narrow if you have known values
  processedAt: string; // or Date if you parse it
  message: string;
}
