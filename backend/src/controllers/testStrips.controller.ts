import { Request, Response } from 'express';
import * as service from '../services/testStrips.service';

export async function uploadTestStrip(req: Request, res: Response) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    /// image processing and QR code extraction would go here

    






    const submission = await service.createSubmission({
      qrCode: null,
      originalImagePath: file.path,
      thumbnailPath: null,
      imageSize: file.size,
      imageDimensions: null,
      status: 'uploaded',
      errorMessage: null,
    });

    res.json({
      id: submission.id,
      status: 'uploaded',
      qrCode: null,
      qrCodeValid: false,
      quality: null,
      processedAt: new Date(),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
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
