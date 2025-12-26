import { Pool } from 'pg';

const globalForPg = global;

export const pool =
  globalForPg.pgPool ??
  new Pool({
    connectionString: process.env.CONNECTION_STR,
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPg.pgPool = pool;
}
