import { QRService } from '../src/business/qrService';
import { ScanValidity } from '../src/common/types';

describe('QRService Integration Tests', () => {
  describe('extractQR', () => {
    it('should correctly validate a valid QR code', async () => {
      const filePath = './tests/assets/qr-valid.png';
      const result = await QRService.extractQR(filePath);

      expect(result).toBeDefined();
      expect(result?.valid).toBe(ScanValidity.VALID);
      expect(result?.errorMessage).toBe('');
      expect(result?.qrCode).not.toBe('');
    });

    it('should correctly identify an expired QR code', async () => {
      const filePath = './tests/assets/qr-expired.png';
      const result = await QRService.extractQR(filePath);

      expect(result).toBeDefined();
      expect(result?.valid).toBe(ScanValidity.EXPIRED);
      expect(result?.errorMessage).not.toBe('');
    });

    it('should correctly identify an invalid QR code', async () => {
      // Note: Using filename 'qr-inavalid.png' as provided in the requirements
      const filePath = './tests/assets/qr-inavalid.png';
      const result = await QRService.extractQR(filePath);

      expect(result).toBeDefined();
      expect(result?.valid).toBe(ScanValidity.INVALID);
    });
  });
});
