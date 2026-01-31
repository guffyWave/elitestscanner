import { TestStripSubmissionRecord, TestStripSubmissionResponseModel } from '../common/types';
import { pool } from '../config/db';
import { logger } from '../utils/logger';
import { isValidUUID } from '../utils/utility';

export async function insertTestStripSubmission(data: TestStripSubmissionRecord) {
  const query = `
      INSERT INTO test_strip_submissions
      (qr_code, original_image_path, thumbnail_path, image_size, image_dimensions, status, error_message)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, created_at;
    `;

  const values = [
    data.qrCode,
    data.originalImagePath,
    data.thumbnailPath,
    data.imageSize,
    data.imageDimensions,
    data.status,
    data.errorMessage || null,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function getAllTestStripSubmissions(): Promise<
  TestStripSubmissionResponseModel[] | undefined
> {
  try {
    const res = await pool.query(`
    SELECT id, qr_code, status, thumbnail_path, created_at, original_image_path, image_size, image_dimensions, error_message
    FROM test_strip_submissions
    ORDER BY created_at DESC
  `);
    return res.rows;
  } catch (error) {
    logger.error('DB Error : fetching all test strip submissions:', error);
    return undefined;
  }
}

export async function getTestStripSubmissionById(
  id: string
): Promise<TestStripSubmissionResponseModel | null> {
  try {
    if (!isValidUUID(id)) {
      return null;
    }
    const sql = `SELECT * FROM test_strip_submissions WHERE id = $1`;
    const result = await pool.query(sql, [id]);
    return result.rows[0];
  } catch (error) {
    logger.error('DB Error : fetching test strip submission by ID:', error);
    return null;
  }
}
