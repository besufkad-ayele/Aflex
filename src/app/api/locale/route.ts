import { cookies } from "next/headers";
import { getLocale } from "@/lib/i18n";

export async function POST(request: Request) {
  const body = await request.json() as { locale?: string };
  const cookieStore = await cookies();
  cookieStore.set("aflex-locale", getLocale(body.locale), { maxAge: 31536000, path: "/", sameSite: "lax" });
  return Response.json({ ok: true });
}