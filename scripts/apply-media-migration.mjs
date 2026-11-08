import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(root, ".env.local");
const env = Object.fromEntries(
  fs
    .readFileSync(envPath, "utf8")
    .split("\n")
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const i = line.indexOf("=");
      return [line.slice(0, i).trim(), line.slice(i + 1).trim().replace(/^["']|["']$/g, "")];
    })
);

const ref = env.SUPABASE_PROJECT_REF;
const token = env.SUPABASE_ACCESS_TOKEN;
const files = [
  "supabase/migrations/20261109_media_hub.sql",
  "supabase/migrations/20261109_media_social_posts.sql",
];

if (!ref || !token) {
  console.error("Missing SUPABASE_PROJECT_REF or SUPABASE_ACCESS_TOKEN in .env.local");
  process.exit(1);
}

for (const file of files) {
  const sql = fs.readFileSync(path.join(root, file), "utf8");
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });
  const body = await res.text();
  if (!res.ok) {
    console.error(`Migration failed for ${file}:`, res.status, body);
    console.error("\nCreate a fresh token at https://supabase.com/dashboard/account/tokens");
    console.error("Or paste both SQL files into the Supabase SQL Editor.");
    process.exit(1);
  }
  console.log("Applied", file);
}

console.log("Media hub migrations applied successfully.");
