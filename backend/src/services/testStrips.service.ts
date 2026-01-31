import { pool } from '../config/db';

export interface SubmissionRecord {
  qr_code: string | null;
  original_image_path: string;
  thumbnail_path: string | null;
  image_size: number;
  image_dimensions: string;
  status: string;
  error_message?: string | null;
}

// export async function createSubmission(data: {
//   qrCode: string | null;
//   originalImagePath: string;
//   thumbnailPath?: string | null;
//   imageSize: number | null;
//   imageDimensions: string | null;
//   status: string;
//   errorMessage?: string | null;
// }) {
//   //@note Todo : Add validation for data fields
//   //@note Todo : throw error if validation fails

//   const query = `
//     INSERT INTO test_strip_submissions
//       (qr_code, original_image_path, thumbnail_path, image_size, image_dimensions, status, error_message)
//     VALUES ($1,$2,$3,$4,$5,$6,$7)
//     RETURNING id, status, qr_code;
//   `;

//   const values = [
//     data.qrCode,
//     data.originalImagePath,
//     data.thumbnailPath || null,
//     data.imageSize,
//     data.imageDimensions,
//     data.status,
//     data.errorMessage || null,
//   ];

//   const result = await pool.query(query, values);
//   return result.rows[0];
// }

//@note Todo : Convert into a class

export async function insertSubmission(data: SubmissionRecord) {
  const query = `
      INSERT INTO test_strip_submissions
      (qr_code, original_image_path, thumbnail_path, image_size, image_dimensions, status, error_message)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, created_at;
    `;

  const values = [
    data.qr_code,
    data.original_image_path,
    data.thumbnail_path,
    data.image_size,
    data.image_dimensions,
    data.status,
    data.error_message || null,
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
  const res = await pool.query(`SELECT * FROM test_strip_submissions WHERE id = $1`, [id]);
  return res.rows[0];
}
