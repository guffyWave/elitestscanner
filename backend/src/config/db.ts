import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

//@note  use - external PgBouncer or Pgpool-II  for scaling
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // while scale horizontally → keep DB pool small per instance
  // max: 10, // presuming small to medium scale apps
  // idleTimeoutMillis: 10_000,
  // connectionTimeoutMillis: 5_000,
});
