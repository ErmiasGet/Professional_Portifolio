import fs from "node:fs/promises";
import path from "node:path";
import { getPool, isDatabaseConfigured, withTransaction } from "./client";

export { withTransaction };

/**
 * Applies src/db/schema.sql to the database. The DDL is fully idempotent
 * (CREATE ... IF NOT EXISTS), so it can be re-run safely. A schema_migrations
 * table tracks the applied version so repeat runs are cheap no-ops.
 */

declare global {
   
  var __portfolioSchemaEnsured: Promise<boolean> | undefined;
}

async function applySchema(): Promise<boolean> {
  const pool = getPool();
  if (!pool) return false;

  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id        BIGSERIAL PRIMARY KEY,
        name      TEXT NOT NULL UNIQUE,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    const applied = await client.query(
      `SELECT 1 FROM schema_migrations WHERE name = $1`,
      ["0001_initial"]
    );
    if (applied.rowCount) return true;

    const schemaPath = path.join(process.cwd(), "src", "db", "schema.sql");
    const ddl = await fs.readFile(schemaPath, "utf-8");

    await client.query("BEGIN");
    try {
      await client.query(ddl);
      await client.query(
        `INSERT INTO schema_migrations (name) VALUES ($1) ON CONFLICT (name) DO NOTHING`,
        ["0001_initial"]
      );
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    }
    return true;
  } finally {
    client.release();
  }
}

/**
 * Ensure the schema exists. Memoized per process; in production (serverless)
 * it runs at most once per cold start. In development it runs once per dev
 * server process. Never throws — callers fall back to static content.
 */
export async function ensureSchema(): Promise<boolean> {
  if (!isDatabaseConfigured()) return false;

  if (!globalThis.__portfolioSchemaEnsured) {
    globalThis.__portfolioSchemaEnsured = applySchema()
      .then((ok) => {
        if (ok) console.info("[db] schema ready");
        return ok;
      })
      .catch((error) => {
        console.error("[db] schema migration failed:", error);
        globalThis.__portfolioSchemaEnsured = undefined;
        return false;
      });
  }

  return globalThis.__portfolioSchemaEnsured;
}

/**
 * Run a query after ensuring the schema exists. Returns null when the
 * database is unavailable so callers can fall back to static content.
 */
export async function queryWithSchema<T>(
  text: string,
  params?: unknown[]
): Promise<T | null> {
  const ready = await ensureSchema();
  const pool = getPool();
  if (!ready || !pool) return null;

  try {
    const res = await pool.query(text, params as never[]);
    return res as unknown as T;
  } catch (error) {
    console.error("[db] query failed:", error);
    return null;
  }
}