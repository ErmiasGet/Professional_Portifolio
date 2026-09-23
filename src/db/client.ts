import { Pool, type PoolClient } from "pg";

/**
 * Postgres connection pool. Lazily created so the site works (with static
 * fallback) even when DATABASE_URL is not configured.
 */

declare global {
   
  var __portfolioPool: Pool | undefined;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getPool(): Pool | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;

  if (global.__portfolioPool) return global.__portfolioPool;

  const isLocal = /localhost|127\.0\.0\.1/.test(url);
  const sslConfigured = url.includes("sslmode");
  const pool = new Pool({
    connectionString: url,
    max: process.env.NODE_ENV === "production" ? 10 : 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
    ssl: !isLocal && !sslConfigured ? { rejectUnauthorized: false } : undefined,
  });

  pool.on("error", (err) => {
    // Prevent an idle client error from crashing the process.
    console.error("Unexpected Postgres pool error:", err.message);
  });

  global.__portfolioPool = pool;
  return pool;
}

/** Run `fn` inside a transaction, rolling back on error. */
export async function withTransaction<T>(
  fn: (client: PoolClient) => Promise<T>
): Promise<T> {
  const pool = getPool();
  if (!pool) throw new Error("Database is not configured.");

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

/** Best-effort health check. Returns false when DB is unavailable. */
export async function isDatabaseReachable(): Promise<boolean> {
  const pool = getPool();
  if (!pool) return false;
  try {
    await pool.query("SELECT 1");
    return true;
  } catch {
    return false;
  }
}

/** End the pool — used in tests, never in route handlers. */
export async function closePool(): Promise<void> {
  if (global.__portfolioPool) {
    await global.__portfolioPool.end();
    global.__portfolioPool = undefined;
  }
}