import fs from 'fs';
import sharp from 'sharp';
import jsQR, { QRCode } from 'jsqr';
import {
  EliHealthError,
  ERROR_CODES,
  ExpiredQRCode,
  InvalidQRCode,
  QRCodeNotFound,
  SomethingWentWrong,
} from '../utils/errors';
import { QRScanResult, ScanValidity } from '../common/types';
import { ELI_QR_VALIDATION_REFEX, LAST_QR_YEAR_ALLOWED } from '../utils/constants';
import { logger } from '../utils/logger';

//@note : We should use Worker Queue (BullMQ + Redis) for better scalability in future
//Flow: User uploads file → API stores file  → API enqueues job → Redis → Worker process picks job → Worker does heavy processing, stores processed file  → Client polls or uses WebSocket to get status
//However, for now  doing CPU-heavy QR processing in the request itself
export class QRService {
  //todo see any downside of making this static
  static async extractQR(filePath: string): Promise<QRScanResult | null> {
    let qrScanResult: QRScanResult | null = {
      qrCode: '',
      valid: ScanValidity.INVALID,
      errorMessage: '',
    };

    try {
      //  Preprocessing to improve QR recognition
      let image = sharp(filePath)
        .resize(1000, 1000, { fit: 'inside' })
        .median(1) // denoise
        .sharpen({ sigma: 1.2 }) // increase edges
        .linear(1.5, -30) // increase contrast
        .gamma(1.8) // darken darks
        .threshold(130); // convert to B/W

      const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });

      const qr = jsQR(new Uint8ClampedArray(data), info.width, info.height);

      if (!qr) {
        return {
          qrCode: '',
          valid: ScanValidity.INVALID,
          errorMessage: ERROR_CODES.QR.NOT_FOUND.description,
        };
      }

      const qrText = qr.data.trim();

      // Validate format
      const match = qrText.match(ELI_QR_VALIDATION_REFEX);
      if (!match) {
        return {
          qrCode: qrText,
          valid: ScanValidity.INVALID,
          errorMessage: ERROR_CODES.QR.INVALID_QR.description,
        };
      }

      // Year validation
      const year = parseInt(match[1], 10);
      if (isNaN(year) || year < LAST_QR_YEAR_ALLOWED) {
        return {
          qrCode: qrText,
          valid: ScanValidity.EXPIRED,
          errorMessage: ERROR_CODES.QR.EXPIRED_QR.description,
        };
      }

      //Success
      return {
        qrCode: qrText,
        valid: ScanValidity.VALID,
        errorMessage: '',
      };
    } catch (error) {
      logger.error('QR extraction error:', error);
      return qrScanResult;
      // Alternatively, rethrow known errors or wrap unknown errors
      // if (error instanceof EliHealthError) {
      //   throw error;
      // }
      // throw new SomethingWentWrong(error instanceof Error ? error.message : ' ');
    }
  }
}
