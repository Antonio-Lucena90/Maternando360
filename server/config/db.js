import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool, types } = pkg;

// Devolver fechas como strings (igual que mysql2's dateStrings: true)
types.setTypeParser(1082, val => val); // DATE
types.setTypeParser(1114, val => val); // TIMESTAMP
types.setTypeParser(1184, val => val); // TIMESTAMPTZ

const dbPool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false }
});

const executeQuery = async (sql, values = []) => {
  try {
    const result = await dbPool.query(sql, values);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

export default executeQuery;
