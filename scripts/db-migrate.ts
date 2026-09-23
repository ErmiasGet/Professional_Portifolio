import dotenv from "dotenv";
import { resolve } from "path";
import { ensureSchema } from "../src/db/migrate";

dotenv.config();
dotenv.config({ path: resolve(process.cwd(), ".env.local"), override: true });

async function main() {
  const ready = await ensureSchema();
  if (!ready) {
    console.error(
      "Migration skipped: DATABASE_URL is not configured or the database is unreachable."
    );
    process.exit(1);
  }
  console.log("Database schema is up to date.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});