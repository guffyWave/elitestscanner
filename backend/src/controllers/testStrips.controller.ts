import { Request, Response } from 'express';
import * as service from '../services/testStrips.service';
import { ImageProcessor } from '../services/imageProcessor';
import { QRService } from '../services/qrService';
//@note todo: encapsulate in business class
import { insertSubmission } from '../services/testStrips.service';
import { EliHealthError, NoImageUploaded, SomethingWentWrong } from '../utils/errors';

//@todo : check type safety

export async function uploadTestStrip(req: Request, res: Response) {
  try {
    const file = req?.file;
    const filePath = file?.path;

    let qr;
    let meta;

    if (!file || !filePath) {
      return res.status(400).json(new NoImageUploaded());
    }

    try {
      // 1. QR Extraction
      qr = await QRService.extractQR(filePath);
      console.log('check qr ---', qr);
    } catch (error) {
      throw error;
    }

    try {
      // 2. Image processing
      meta = await ImageProcessor.processImage(filePath);
    } catch (error) {
      throw error;
    }

    //@note Todo: Handle cases where QR extraction fails

    // const submission = await service.createSubmission({
    //   qrCode: null,
    //   originalImagePath: file.path,
    //   thumbnailPath: null,
    //   imageSize: file.size,
    //   imageDimensions: null,
    //   status: 'uploaded',
    //   errorMessage: null,
    // });

    // 3. Insert into DB

    /// @note todo: fix data mapping into db
    const dbRecord = await insertSubmission({
      qr_code: qr.qrCode,
      original_image_path: filePath,
      thumbnail_path: meta.thumbnailPath,
      image_size: meta.size,
      image_dimensions: `${meta.width}x${meta.height}`,
      status: qr.valid ? 'processed' : 'error',
      error_message: qr.valid ? null : qr.errorMessage,
    });

    if (qr && meta) {
      res.json({
        id: dbRecord.id,
        status: qr.valid ? 'processed' : 'error',
        qrCode: qr.qrCode,
        qrCodeValid: qr.valid,
        quality: meta.width * meta.height > 0 ? 'ok' : 'bad',
        processedAt: dbRecord.created_at,
      });
    }
  } catch (error: any) {
    console.error('Upload error:', error);

    if (error instanceof EliHealthError) {
      return res.status(400).json(error);
    }

    return res
      .status(500)
      .json(new SomethingWentWrong(error instanceof Error ? error.message : ' '));
  }
}

export async function getAll(req: Request, res: Response) {
  const rows = await service.getAllSubmissions();
  res.json(rows);
}

export async function getOne(req: Request, res: Response) {
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id || '';

  const row = await service.getSubmissionById(id as string);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
}
