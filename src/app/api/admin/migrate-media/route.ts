import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@/lib/supabase/server";
import { canAccessAdminPath } from "@/lib/cms/rbac";
import type { UserRole } from "@/lib/supabase/types";

export const runtime = "nodejs";

const MIGRATION_FILES = [
  "supabase/migrations/20261109_media_hub.sql",
  "supabase/migrations/20261109_media_social_posts.sql",
];

async function runSql(query: string) {
  const ref = process.env.SUPABASE_PROJECT_REF?.replace(/^["']|["']$/g, "");
  const token = process.env.SUPABASE_ACCESS_TOKEN?.replace(/^["']|["']$/g, "");

  if (!ref || !token) {
    return {
      ok: false as const,
      error:
        "Missing SUPABASE_ACCESS_TOKEN. Create a token at https://supabase.com/dashboard/account/tokens and set it in .env.local",
    };
  }

  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const body = await res.text();
  if (!res.ok) {
    return { ok: false as const, error: `Management API ${res.status}: ${body}` };
  }
  return { ok: true as const, via: "SUPABASE_ACCESS_TOKEN", body };
}

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  const role = (profile as { role?: UserRole } | null)?.role;
  if (!canAccessAdminPath("/admin/gallery", role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const results: Array<{ file: string; ok: boolean; via?: string; error?: string }> = [];
  for (const file of MIGRATION_FILES) {
    const sql = await readFile(path.join(process.cwd(), file), "utf8");
    const result = await runSql(sql);
    results.push({
      file,
      ok: result.ok,
      via: result.ok ? result.via : undefined,
      error: result.ok ? undefined : result.error,
    });
    if (!result.ok) {
      return NextResponse.json({ ok: false, results }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true, results });
}
