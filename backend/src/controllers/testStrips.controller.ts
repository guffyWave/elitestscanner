import { Request, Response } from 'express';
import * as service from '../services/testStrips.service';
import { ImageProcessor } from '../business/imageProcessor';
import { QRService } from '../business/qrService';
import { insertTestStripSubmission } from '../services/testStrips.service';
import {
  EliHealthError,
  ERROR_CODES,
  InternalServerError,
  NoImageUploaded,
  SomethingWentWrong,
} from '../utils/errors';
import {
  ImageMetadata,
  QRScanQuality,
  QRScanResult,
  ScanValidity,
  TestStripSubmissionUploadResponse,
} from '../common/types';
import { RESPONSE_MESSAGE_FAILED_QR, RESPONSE_MESSAGE_SUCCESS } from '../utils/constants';
import { logger } from '../utils/logger';
import { isValidUUID } from '../utils/utility';

//@note Improvement - in case of long image processing / qr extraction
///Express API → BullMQ Queue → Worker Thread → Result stored in Redis
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

    //@note Improvement - in case image processing or qr extraction is taking too long
    //Express receives request --> adds job to Redis queue  //  {Queue}  = require("bullmq"); // job = await queue.add("process", { imageData });
    //BullMQ Worker will picks job -> sends data to Worker Thread //  { Worker } = require("bullmq")  { Worker: ThreadWorker } = require("worker_threads") worker.postMessage(data);
    //Worker Thread doing actual CPU-heavy work  //  { parentPort } = require("worker_threads") parentPort.on("message", ({ para }) => { //.... parentPort.postMessage(result)});
    //result will returned and stored in Redis  // queue.getJob(jobId).result
    // return result as GCM , webSockets or polling to user 

    //QR Extraction
    qrScanResult = await QRService.extractQR(filePath);

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

//@note Improvement - Use testStripsRoutes GraphQL endpoint
// 1. '@apollo/server typeDef resolver Mutation/Query' for many small queries,  api is complex and expanding
//2. Use Rate limiting with testStripsRoutes express-rate-limit , fastify-rate-limit , Nginx rate-limiting
//3. Redis Cache // new Redis({host,port});
export async function getAllTestStripSubmissions(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1; // default 1
  const limit = parseInt(req.query.limit as string) || 10; // default 10

  if (page < 1 || limit < 1) {
    return res
      .status(400)
      .json(
        new EliHealthError(
          ERROR_CODES.RESPONSE.INVALID_INPUT.code,
          ERROR_CODES.RESPONSE.INVALID_INPUT.name,
          ERROR_CODES.RESPONSE.INVALID_INPUT.description
        )
      );
  }

  const result = await service.getAllTestStripSubmissions(page, limit);

  if (!result) {
    return res
      .status(500)
      .json(
        new EliHealthError(
          ERROR_CODES.RESPONSE.NO_DATA.code,
          ERROR_CODES.RESPONSE.NO_DATA.name,
          ERROR_CODES.RESPONSE.NO_DATA.description
        )
      );
  }
  res.json(result);
}

export async function getOneTestStripSubmissionById(req: Request, res: Response) {
  const { id } = req.params;

  if (!id || typeof id !== 'string') {
    return res
      .status(400)
      .json(
        new EliHealthError(
          ERROR_CODES.RESPONSE.INVALID_ID.code,
          ERROR_CODES.RESPONSE.INVALID_ID.name,
          ERROR_CODES.RESPONSE.INVALID_ID.description
        )
      );
  }

  if (!isValidUUID(id)) {
    return res
      .status(400)
      .json(
        new EliHealthError(
          ERROR_CODES.RESPONSE.INVALID_UUID.code,
          ERROR_CODES.RESPONSE.INVALID_UUID.name,
          ERROR_CODES.RESPONSE.INVALID_UUID.description
        )
      );
  }

  try {
    const row = await service.getTestStripSubmissionById(id);
    if (!row) {
      return res
        .status(404)
        .json(
          new EliHealthError(
            ERROR_CODES.RESPONSE.NOT_FOUND.code,
            ERROR_CODES.RESPONSE.NOT_FOUND.name,
            ERROR_CODES.RESPONSE.NOT_FOUND.description
          )
        );
    }

    res.json(row);
  } catch (err) {
    logger.error('Error fetching test strip submission by ID:', err);
    return res.status(500).json(new InternalServerError());
  }
}
