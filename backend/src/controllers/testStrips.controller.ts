import { Request, Response } from 'express';
import * as service from '../services/testStrips.service';
import { ImageProcessor } from '../business/imageProcessor';
import { QRService } from '../business/qrService';
//@note todo: encapsulate in business class
import { insertTestStripSubmission } from '../services/testStrips.service';
import { EliHealthError, NoImageUploaded, SomethingWentWrong } from '../utils/errors';
import {
  ImageMetadata,
  QRScanQuality,
  QRScanResult,
  ScanValidity,
  TestStripSubmissionUploadResponse,
} from '../common/types';
import { RESPONSE_MESSAGE_FAILED_QR, RESPONSE_MESSAGE_SUCCESS } from '../utils/constants';
import { logger } from '../utils/logger';

//@todo : check type safety

export async function uploadTestStrip(
  req: Request,
  res: Response<TestStripSubmissionUploadResponse>
) {
  let uploadTestStripResponse: TestStripSubmissionUploadResponse;

  try {
    const file = req?.file;
    const filePath = file?.path;

    let qrScanResult: QRScanResult | null;
    let metaData: ImageMetadata | null;

    if (!file || !filePath) {
      return res.status(400).json(new NoImageUploaded());
    }

    logger.info('Image upload started - ', req.file?.originalname);

    // QR Extraction
    qrScanResult = await QRService.extractQR(filePath);
    console.log('check qr ---', qrScanResult);

    //Image processing
    metaData = await ImageProcessor.processImage(filePath);

    const dbRecord = await insertTestStripSubmission({
      qrCode: qrScanResult?.qrCode || '',
      originalImagePath: filePath,
      thumbnailPath: metaData?.thumbnailPath || null,
      imageSize: metaData?.size || 0,
      imageDimensions: `${metaData?.width || 0}x${metaData?.height || 0}`,
      status: qrScanResult?.valid || ScanValidity.INVALID,
      errorMessage: qrScanResult?.errorMessage || null,
    });

    uploadTestStripResponse = {
      id: dbRecord?.id,
      status: qrScanResult?.valid || ScanValidity.INVALID,
      qrCode: qrScanResult?.qrCode || null,
      qrCodeValid: qrScanResult?.valid || ScanValidity.INVALID,
      quality:
        qrScanResult?.valid === ScanValidity.VALID
          ? metaData?.width && metaData?.height
            ? QRScanQuality.GOOD
            : QRScanQuality.BAD
          : QRScanQuality.NA,
      processedAt: dbRecord?.created_at,
      message:
        qrScanResult?.valid === ScanValidity.VALID
          ? RESPONSE_MESSAGE_SUCCESS
          : qrScanResult?.errorMessage || RESPONSE_MESSAGE_FAILED_QR,
    };
    logger.info('Image processed successfully', uploadTestStripResponse);
    res.json(uploadTestStripResponse);
  } catch (error: any) {
    logger.error('Upload error:', error);

    if (error instanceof EliHealthError) {
      return res.status(400).json(error);
    }

    return res
      .status(500)
      .json(new SomethingWentWrong(error instanceof Error ? error.message : ' '));
  }
}

export async function getAll(req: Request, res: Response) {
  const rows = await service.getAllTestStripSubmissions();
  res.json(rows);
}

export async function getOne(req: Request, res: Response) {
  const id = Array.isArray(req?.query?.id) ? req?.query?.id[0] : req.query.id || '';

  const row = await service.getTestStripSubmissionById(id as string);
  if (!row) return res.status(404).json({ error: 'Not found' }); /// todo Object not found error
  res.json(row);
}
