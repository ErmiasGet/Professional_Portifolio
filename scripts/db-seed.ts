import dotenv from "dotenv";
import { resolve } from "path";
import { ensureSchema } from "../src/db/migrate";
import { seedStaticContent } from "../src/lib/data/seed";
import { bootstrapAdmin } from "../src/lib/auth/bootstrap";

dotenv.config();
dotenv.config({ path: resolve(process.cwd(), ".env.local"), override: true });

async function main() {
  const ready = await ensureSchema();
  if (!ready) {
    console.error(
      "Seed skipped: DATABASE_URL is not configured or the database is unreachable."
    );
    process.exit(1);
  }

  console.log("[seed] importing existing static content into the database...");
  const { seeded } = await seedStaticContent();
  console.log(`[seed] seeded ${seeded} content rows.`);

  const admin = await bootstrapAdmin({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    name: process.env.ADMIN_NAME,
  });
  if (admin) {
    console.log(`[seed] admin account ready for ${admin.email} (from ADMIN_* env vars).`);
  } else {
    console.log("[seed] no ADMIN_* env vars set — admin account was not created.");
  }

  console.log("[seed] done.");
}

main().catch((error) => {
  console.error("[seed] failed:", error);
  process.exit(1);
});