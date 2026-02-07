import {
  TestStripSubmissionRecord,
  TestStripSubmissionResponseModel,
  TestStripSubmissionsPageResponseModel,
} from '../common/types';
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

//3. Redis Cache // new Redis({host,port});
export async function getAllTestStripSubmissions(
  page: number,
  limit: number
): Promise<TestStripSubmissionsPageResponseModel | undefined> {
  try {
    //  await redis.get(CACHE_KEY); JSON.parse(cached)

    const offset = (page - 1) * limit;

    const listQuery = `
      SELECT id, qr_code, status, thumbnail_path, created_at, original_image_path,
             image_size, image_dimensions, error_message
      FROM test_strip_submissions
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const countQuery = `SELECT COUNT(*)::int AS total FROM test_strip_submissions`;

    const [listResult, countResult] = await Promise.all([
      pool.query(listQuery, [limit, offset]),
      pool.query(countQuery),
    ]);

    //await redis.set(CACHE_KEY, JSON.stringify(rows), "EX", CACHE_TTL);

    return {
      data: listResult.rows,
      page,
      limit,
      total: countResult.rows[0].total,
      totalPages: Math.ceil(countResult.rows[0].total / limit),
    };
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
