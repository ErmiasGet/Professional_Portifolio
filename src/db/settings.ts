import { queryWithSchema, withTransaction } from "./migrate";

export type SettingsKey =
  | "site"
  | "profile"
  | "seo"
  | "social"
  | "availability"
  | "resume"
  | "nav"
  | "footer"
  | "sections"
  | "visibility";

export interface SettingRow {
  key: string;
  value: Record<string, unknown>;
  updatedAt: string;
}

export async function getAllSettings(): Promise<Record<string, unknown> | null> {
  const res = await queryWithSchema<{ rows: SettingRow[] }>(
    `SELECT key, value, updated_at AS "updatedAt" FROM site_settings`
  );
  if (!res?.rows) return null;
  const out: Record<string, unknown> = {};
  for (const row of res.rows) out[row.key] = row.value;
  return out;
}

export async function getSetting(key: string): Promise<unknown | null> {
  const res = await queryWithSchema<{ rows: SettingRow[] }>(
    `SELECT value FROM site_settings WHERE key = $1`,
    [key]
  );
  return res?.rows?.[0]?.value ?? null;
}

export async function setSetting(
  key: string,
  value: unknown
): Promise<boolean> {
  const res = await queryWithSchema(
    `INSERT INTO site_settings (key, value, updated_at)
     VALUES ($1, $2, now())
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
     RETURNING key`,
    [key, JSON.stringify(value)]
  );
  return Boolean(res);
}

export async function setSettings(
  entries: Record<string, unknown>
): Promise<boolean> {
  const ok = await withTransaction(async (client) => {
    for (const [key, value] of Object.entries(entries)) {
      await client.query(
        `INSERT INTO site_settings (key, value, updated_at)
         VALUES ($1, $2, now())
         ON CONFLICT (key) DO UPDATE
           SET value = EXCLUDED.value, updated_at = now()`,
        [key, JSON.stringify(value)]
      );
    }
    return true;
  }).catch(() => false);
  return ok;
}

export async function deleteSetting(key: string): Promise<boolean> {
  const res = await queryWithSchema(
    `DELETE FROM site_settings WHERE key = $1 RETURNING key`,
    [key]
  );
  return Boolean(res);
}