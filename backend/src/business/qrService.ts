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

export class QRService {
  static async extractQR(filePath: string): Promise<QRScanResult | null> {
    let qrScanResult: QRScanResult | null = {
      qrCode: '',
      valid: ScanValidity.INVALID,
      errorMessage: '',
    };

    try {
      const image = sharp(filePath);
      const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });

      const qr: QRCode | null = jsQR(new Uint8ClampedArray(data), info.width, info.height);

      if (!qr) {
        qrScanResult = {
          qrCode: '',
          valid: ScanValidity.INVALID,
          errorMessage: ERROR_CODES.QR.NOT_FOUND.description,
        };
        return qrScanResult;
        // throw new QRCodeNotFound(); // alternativly throw an error
      }

      const qrText: string = qr?.data.trim() || '';

      // Basic validation (format: ELI-YYYY-XXX)
      const match = qrText?.match(ELI_QR_VALIDATION_REFEX);

      if (!match) {
        qrScanResult = {
          qrCode: qrText,
          valid: ScanValidity.INVALID,
          errorMessage: ERROR_CODES.QR.INVALID_QR.description,
        };
        return qrScanResult;
        // throw new InvalidQRCode(); // alternativly throw an error
      }

      // Year expiration logic
      const year: number = parseInt(match[1]);
      if (year < LAST_QR_YEAR_ALLOWED) {
        qrScanResult = {
          qrCode: qrText,
          valid: ScanValidity.INVALID,
          errorMessage: ERROR_CODES.QR.EXPIRED_QR.description,
        };
        return qrScanResult;
        // throw new ExpiredQRCode();  // alternativly throw an error
      }

      qrScanResult = {
        qrCode: qrText,
        valid: ScanValidity.VALID,
        errorMessage: '',
      };

      return qrScanResult;
    } catch (error) {
      return qrScanResult;

      // Alternatively, rethrow known errors or wrap unknown errors
      // if (error instanceof EliHealthError) {
      //   throw error;
      // }
      // throw new SomethingWentWrong(error instanceof Error ? error.message : ' ');
    }
  }
}
