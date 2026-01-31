import fs from 'fs';
import sharp from 'sharp';
import jsQR from 'jsqr';

export interface QRResult {
  qrCode: string | null;
  valid: boolean;
  errorMessage?: string;
}

export class QRService {
  static async extractQR(filePath: string): Promise<QRResult> {
    const image = sharp(filePath);
    const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });

    const qr = jsQR(new Uint8ClampedArray(data), info.width, info.height);

    if (!qr) {
      return { qrCode: null, valid: false, errorMessage: 'No QR code detected' };
    }

    const qrText = qr.data.trim();

    // Basic validation (format: ELI-YYYY-XXX)
    const regex = /^ELI-(\d{4})-[A-Z0-9]+$/;
    const match = qrText.match(regex);

    if (!match) {
      return { qrCode: qrText, valid: false, errorMessage: 'Invalid QR code format' };
    }

    // Year expiration logic
    const year = parseInt(match[1]);
    if (year < 2023) {
      return { qrCode: qrText, valid: false, errorMessage: 'QR code expired' };
    }

    return {
      qrCode: qrText,
      valid: true,
    };
  }
}
