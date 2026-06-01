import { pool } from "./db";

export async function query(sql: string, params?: unknown[]) {
  return pool.query(sql, params);
}
