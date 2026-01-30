import { pool } from "../config/db";

export async function createSubmission(data: {
  qrCode: string | null;
  originalImagePath: string;
  thumbnailPath?: string | null;
  imageSize: number | null;
  imageDimensions: string | null;
  status: string;
  errorMessage?: string | null;
}) {
  const query = `
    INSERT INTO test_strip_submissions
      (qr_code, original_image_path, thumbnail_path, image_size, image_dimensions, status, error_message)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING id, status, qr_code;
  `;

  const values = [
    data.qrCode,
    data.originalImagePath,
    data.thumbnailPath || null,
    data.imageSize,
    data.imageDimensions,
    data.status,
    data.errorMessage || null
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function getAllSubmissions() {
  const res = await pool.query(`
    SELECT id, qr_code, status, thumbnail_path, created_at
    FROM test_strip_submissions
    ORDER BY created_at DESC
  `);
  return res.rows;
}

export async function getSubmissionById(id: string) {
  const res = await pool.query(
    `SELECT * FROM test_strip_submissions WHERE id = $1`,
    [id]
  );
  return res.rows[0];
}
